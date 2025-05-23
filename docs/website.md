# Self-hosting your website

## Configuring a Static Site with Caddy

Assuming you have configured Caddy, we'll host our static site

- Edit `/etc/caddy/Caddyfile` to point to the website's contents:

```diff=
 localhost {
-    respond "Hi!"
+    encode gzip
+
+    root * /var/www/html
+    file_server browse
 }
```

---

## Explanation of the changes

- A small breakdown of all the directives used:
  - `encode`: Compress the contents with the `gzip` algorithm, allowing faster page loads as less data is transmitted over the network
  - `root`, `file_server`: A file server for serving static files locate at the `root` directory (i.e. `/var/www/html`)
    - The `browse` directive under `file_server` is used to display a fancy directory listing with search included! This is useful for serving artifacts / binaries

- Reload the caddy config: `sudo caddy reload`

---

## Adding some content

In order to have some data to display, we can create a basic index.html file.

```shell=
$ mkdir -p /var/www/html
$ echo '<p>Hello World!</p>' > /var/www/html/index.html
```

That's it! Just reload the site in your browser (might need `Ctrl + Shift + R` to fetch a fresh copy) and see the changes.

If you want to see the `browse` mode in action, move the index.html to another name (such as index.html.bkp) and a file explorer interface will show up!

`mv /var/www/html/index.html /var/www/html/index.html.bkp`

Try loading https://localhost on your system and you should be able to see it live in action

## Self-hosting your applications by containerization

1. Create your application. Let's take an example of a simple Next.js application. Create one using this command (assuming you have node and npm installed on your system. It's available as `nodejs` and `npm` in package repositories)

  ``` sh
  npx create-next-app # Should ask for project name, use defaults when unsure, will install dependencies  
  cd <your-project-name>
  ```

2. Dockerize your application using a simple Dockerfile
  ``` dockerfile
  # Base image
  FROM node:18-alpine

  # Set working directory
  WORKDIR /app

  # Copy package files and install dependencies
  COPY package*.json ./
  RUN npm install

  # Copy the rest of the application
  COPY . .

  # Build the Next.js app
  RUN npm run build

  # Expose the port the app runs on
  EXPOSE 3000

  # Start the Next.js app
  CMD ["npm", "start"]
  ```

3. Build a Docker image for usage in containers. Substitute <your-image-name> with an image name of your choice.
  ``` sh
  docker build -t <your-image-name>:latest .
  ```

4. Run the container with a container name of your choice
  ``` sh
  docker run -d --name <container-name> -p 3000:3000 <your-image-name>
  ```

5. Edit your Caddyfile
  ``` groovy
  :80 {
      reverse_proxy localhost:3000
  }
  ```

You should be able to access the site at https://localhost upon reloading Caddy