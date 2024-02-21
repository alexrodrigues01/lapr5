npm run build:deploy
scp -r -P 10220 ./dist/* root@vsgate-ssh.dei.isep.ipp.pt:/var/www/html