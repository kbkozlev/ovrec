# 🎥 ovrec - Online Video Recorder

**ovrec** (short for **Online Video Recorder**) is a lightweight, browser-based tool that enables you to record your **screen**, **webcam**, **microphone**, or a combination of these — all directly from your browser, with **no time limits** and **no server-side processing**.

All processing is done **locally in your browser** using modern Web APIs, ensuring that **no video or audio data is ever uploaded or shared**. Your recordings remain completely private and secure — as they should be.

[Try for Free!](https://kbkozlev.github.io/ovrec/)
---

## 🚀 Why ovrec?

There are many online screen recording tools out there, but most of them:

- Are **not open source**.
- Limit recording time.
- Require registration or payment.
- Upload your content to remote servers.

**ovrec is different**:
- It’s **100% open source**.
- It imposes **no recording limits**.
- It works **entirely offline** after loading.
- It’s built to be **hackable and developer-friendly**.

---

## 🛠 Features

- ✅ Record screen, webcam, or both simultaneously.
- ✅ Include system audio and microphone audio.
- ✅ Preview and download your recordings instantly.
- ✅ Countdown timer before recording starts.
- ✅ Optional webcam popup for better presentation.
- ✅ Fully client-side — nothing is sent anywhere.

---

## 🔭 Project Status

This project is in its **early stages**, but it's fully functional and ready to use!

We welcome all forms of contribution: code, feature suggestions, UI improvements, bug reports, documentation fixes — or just feedback. If you're passionate about privacy-focused tools or browser-based recording, **this is the project for you**.

---

## 🌱 Future Roadmap

Some exciting ideas for future development:

- [ ] Save and host recordings on a server of your choosing with unique shareable links.
- [ ] Cloud upload integrations (e.g. Dropbox, S3, WebDAV).
- [ ] Video trimming and editing features.
- [ ] Configurable webcam/video layout and styles.
- [ ] Progressive Web App (PWA) support.

Contributions toward any of these (or other ideas) are welcome — please open an issue or PR!

---

## 📦 Self-Hosting

ovrec is extremely lightweight and can be self-hosted in just a few steps. Just clone the repo and run:

```bash
npm install -g http-server

git clone https://github.com/kbkozlev/ovrec.git
cd ovrec
http-server ./app -p 80 
# or to run in background
nohup http-server ./app -p 80 > output.log 2>&1 & 
# to kill the background process
pkill -f "http-server"
```

Then open [http://localhost:80](http://localhost:80) to use ovrec on your own server.

---

## 📄 License

This project is licensed under the **GNU General Public License v3.0** — free for personal and commercial use under its terms.

---

## 🤝 Contributing

Want to help? That’s awesome!

- Star the repo ⭐
- Fork and submit a pull request
- Open issues for bugs or suggestions
- Share ovrec with others who might find it useful

---

## 📢 Contact

Feel free to open an issue or discussion on the GitHub repo. We’re always happy to collaborate and improve the project together!