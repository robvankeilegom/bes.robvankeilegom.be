./node_modules/.bin/ng build --prod
rsync -av ./dist/bes/ robvankeilegom.be:~/websites/bes.robvankeilegom.be/current --delete

