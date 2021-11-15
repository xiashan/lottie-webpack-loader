/*
 * @Author: xiashan
 * @Date: 2020-12-16 03:33:42
 * @LastEditTime: 2021-11-15 16:39:31
 */
const path = require('path');

function lottieWebpackLoader(content) {
  const callback = this.async();

  const data = JSON.parse(content);

  const imageModules = [];

  data.assets.forEach((asset, index) => {
    if (asset.p) {
      const imageAbsPath = path.join(this.context, asset.u, asset.p);
      const imageRelPath = `.${path.sep}${path.relative(this.context, imageAbsPath)}`;

      imageModules.push({
        path: imageRelPath,
        index,
      });

      asset.u = '';

      // 如果一个 loader 使用外部资源（例如，从文件系统读取），必须声明它。这些信息用于使缓存 loaders 无效，以及在观察模式(watch mode)下重编译
      const imagePath = path.resolve(imageRelPath);
      this.addDependency(imagePath);
    }
  });

  const lottie = JSON.stringify(data, null, 2);

  let output = '';
  if (imageModules.length) {
    output += 'const assets = [];\n';
  }
  imageModules.forEach((asset) => {
    output += `assets.push([require(${JSON.stringify(asset.path)}), ${asset.index}]);\n`;
  });

  output += `const data = ${lottie}\n`;

  if (imageModules.length) {
    output += `
for(let i=0; i<assets.length; i++) {
  const path = assets[i][0];
  const index = assets[i][1];
  data.assets[index].p = path;
}\n`;
  }

  output += 'module.exports = data;';
  callback(null, output);
}

module.exports = lottieWebpackLoader;
