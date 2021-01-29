# Jesus Collective Mobile App
To setup a local copy of The Jesus Collective App for development you will need an AWS account.

Optional Install Steps
---
1. Setup a free AWS account. Optional - only for backend work
2. Install Visual Code (code.visualstudio.com) - optionally use whatever editor you like

Setup Github for delivering code
---
1. Ensure you have a github.com account
2. Ask George to give you access to submit code

Install (for windows replace ~ with c:\)
---
1. Install the latest version of Node/NPM (www.nodejs.org)
2. Install git (www.git-scm.com) - on mac just open terminal and type git and follow the prompts
3. Clone the repo
    From terminal on a linux machine:
        a) mkdir ~/code
        b) mkdir ~/code/jc
        c) cd ~/code/jc
        d) git clone https://github.com/jesus-collective/mobile.git

4. Install packages:
    From terminal on a linux machine:
        a) cd ~/code/jc/mobile
        b) npm install
    
5. To Run: 
    From terminal on a linux machine:
        a) cd ~/code/jc/mobile
        b) npm start
        c) Press w (web), i (ios), a (android) to start the appropriate client
        d) npm test (to run tests)

6. Optionally - to setup AWS run:
    a) npm install -g @aws-amplify/cli
    b) cd ~/code/jc/mobile
    c) amplify configure
    d) amplify push
    e) amplify publish -c
        
To create deployment packages run:
    a) cd ~/code/jc/mobile
    b) npm run-script buildExpo
    c) Download the resulting files.
    d) Upload the files to the Apple or Google Play store.

