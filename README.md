# Load assets for json lottie-web files

## Usage

```
npm install @noxfed/lottie-webpack-loader --save-dev
```

**`webpack.config.js`**

```javascript
module.exports = {
  module: {
    rules: [
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: /(lottie)/,
        loader: 'lottie-web-webpack-loader',
      }
    ]
  }
}
```

**`animation.js`**

```javascript
import lottie from 'lottie-web';
import animationData from '@/assets/lottie/hero/index.json';

const heroAnimation = lottie.loadAnimation({
  container: document.getElementById('hero-animation'),
  renderer: 'svg',
  animationData
});

heroAnimation.goToAndPlay(0, true);
```

## License

MIT
