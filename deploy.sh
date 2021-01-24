./node_modules/.bin/ng build --prod
rsync -av ./dist/bes/ robvankeilegom.be:~/webroot/bes.robvankeilegom.be/ --delete

