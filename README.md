![Hero](https://i.ibb.co/2FYtPnr/github-md.jpg)


1. **Clone the Repository**

    ```sh
    git clone https://github.com/TeaByte/catdns.git
    cd catdns
    ```

2. **Install Dependencies**

    ```sh
    npm install
    ```

3. **Make `.env` File**

     ```env
    # Github Oauth
    GITHUB_ID=Iv1.08bc0f...
    GITHUB_SECRET=7c4a88b705f....
    
    
    # NextJS
    NEXTAUTH_URL=https://07ba-5-1....
    NEXTAUTH_SECRET=2jOHkDR1p9zV....

    # Database ( Storing Users )
    DATABASE_URL=postgres://TeaByte:HuypCZG....
    SHADOW_DATABASE_URL=postgres://TeaByte:H....
    
    # Cloudflare ( For DNS Mangment )
    CLOUDFLARE_API_KEY=WWEX-j9I.....
    CLOUDFLARE_ZONE_ID=070a08f9a.....
    ```

4. **Start the Development Server**

    ```sh
    npm run dev
    ```
##

![Hero](https://i.ibb.co/8xN33sx/auth-hero-small.jpg)
