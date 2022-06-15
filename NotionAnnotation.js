export default class Annotation {
  constructor(options) {
    this.annotations = {};
    if (options !== undefined) {
      Object.entries(options).forEach(([key, value]) => {
        this[key] = value;
      });
    }
  }

  /**
   * @param {string} color default red orange yellow green blue purple pink brown gray
   */
  color(color) {
    this.annotations['color'] = color;
    return this;
  }

  code() {
    this.annotations['code'] = true;
    return this;
  }

  bold() {
    this.annotations['bold'] = true;
    return this;
  }

  italic() {
    this.annotations['italic'] = true;
    return this;
  }

  strikethrough() {
    this.annotations['strikethrough'] = true;
    return this;
  }

  underline() {
    this.annotations['underline'] = true;
    return this;
  }

  link(url) {
    this['url'] = url;
    return this;
  }
}
