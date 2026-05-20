# Panchvati Flowgistics — Website

Official marketing website for **Panchvati Flowgistics**, a premium logistics company offering freight forwarding, customs clearance, warehousing, transportation, and consultancy across India’s key ports.

**Live site:** [https://panchvatiflowgistics.com](https://panchvatiflowgistics.com)

---

## Credits

| Role | |
|------|--|
| **Client** | Panchvati Flowgistics |
| **Design & development** | [Codescreen.in](https://codescreen.in) |

---

## Tech stack

- Static front end: HTML5, CSS3, JavaScript (GSAP, Swiper)
- Contact form backend: PHP 7.4+ with [PHPMailer](https://github.com/PHPMailer/PHPMailer)
- Hosting: Apache (cPanel) with `.htaccess`

---

## Project structure

```
panchvati/
├── index.html          # Main single-page site
├── mailSubmit.php      # Contact form handler (AJAX JSON)
├── css/main.css
├── js/main.js
├── imgs/               # Images, video, favicons
├── PHPMailer/          # Mail library (bundled)
├── config/
│   ├── mail.config.example.php   # Template (committed)
│   └── mail.config.php           # Secrets (gitignored — create locally)
├── .htaccess           # Apache: HTTPS, headers, caching
├── .well-known/        # security.txt, SSL verification, app links
├── robots.txt
└── README.md
```

---

## Requirements

- **Production:** Apache with `mod_rewrite`, `mod_headers`, PHP 7.4+ and SMTP enabled
- **Local testing:** PHP built-in server or XAMPP/WAMP; mail config optional for form tests

---

## Git — clone and setup

### 1. Clone the repository

```bash
git clone <your-repo-url> panchvati
cd panchvati
```

### 2. Configure mail (required for contact form)

```bash
cp config/mail.config.example.php config/mail.config.php
```

Edit `config/mail.config.php` with your cPanel SMTP details:

- `smtpHost` — usually `mail.yourdomain.com`
- `smtpUser` / `smtpPass` — mailbox credentials
- `smtpPort` — `465` (SSL) or `587` (TLS)

`config/mail.config.php` is listed in `.gitignore` and must never be pushed to a public remote.

### 3. Verify tracked server files

These must stay in the repo (not ignored):

- `.htaccess` — Apache rules
- `.well-known/` — `security.txt`, SSL ACME challenges, app-link files

```bash
git check-ignore -v .htaccess .well-known/security.txt
# Should print nothing (files are tracked)
```

### 4. Local preview

```bash
php -S localhost:8080
```

Open [http://localhost:8080](http://localhost:8080). Contact form needs valid `config/mail.config.php` and working SMTP.

---

## Deployment (cPanel / Apache)

1. Upload all files to `public_html` (or subdomain document root).
2. Ensure `config/mail.config.php` exists on the server with production SMTP credentials.
3. Confirm `.htaccess` is uploaded (show hidden files in File Manager).
4. Upload `.well-known/security.txt` for security contact discovery.
5. For Let’s Encrypt / AutoSSL, place validation files under `.well-known/acme-challenge/` if your host requires it.
6. Test HTTPS redirect and the contact form.

### Post-deploy checklist

- [ ] Site loads over HTTPS
- [ ] Favicons and `site.webmanifest` load
- [ ] Contact form returns success JSON
- [ ] `https://yourdomain.com/.well-known/security.txt` is reachable
- [ ] `robots.txt` and sitemap (if added) are reachable

---

## Environment-specific paths

Gallery image paths in `js/main.js` use `/panchvati/imgs/...` for local subfolder installs. On production (document root = site root), update those URLs to `/imgs/...` or use relative paths.

---

## Security notes

- Do not commit `config/mail.config.php`, `.env`, or SMTP passwords.
- Rotate credentials if they were ever committed to a public repository.
- `config/` is blocked from direct HTTP access via `.htaccess`.

---

## License

© Panchvati Flowgistics. All rights reserved.

Website design and development © [Codescreen.in](https://codescreen.in).
