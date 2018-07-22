# This is for BarbaJS w/ NodeJS test

## To Start using node :
```bash
node app.js
```

## OR you could start with nodemon as well (Much easier) :
```bash
nodemon app
```

---
# App Configuration

Put your assets files in :
```cmd
./src/assets
```

Put your views files in :
```cmd
./src/views
```

And don't use `res.render` because I did not use any template engine , instead just use this :
```javascript
res.sendFile('index.html' , {
    root : 'path/to/file'
})
```