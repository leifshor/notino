export class NotionBlock {
  constructor(type) {
    this.type = type;
    this[`${type}`] = {};
    this.object = 'block';
  }

  icon(icon) {
    if (icon.includes('http')) {
      this[`${this.type}`].icon = {
        type: 'external',
        external: {
          url: icon,
        },
      };
    }
    this[`${this.type}`].icon = {
      type: 'emoji',
      emoji: icon,
    };
    return this;
  }

  /// For bookmark and embed
  url(url = '') {
    this[`${this.type}`] = { url: url };
    return this;
  }

  /// For image, video, file, etc.
  link(link = '') {
    this[`${this.type}`] = { type: 'external', external: { url: link } };
    return this;
  }

  /// For code block
  language(language = 'javascript') {
    this[`${this.type}`].language = language;
    return this;
  }

  /// For code block
  caption(...textArray) {
    this[`${this.type}`].caption = [...textArray];
    return this;
  }

  color(color = 'default') {
    this[`${this.type}`].color = color;
    return this;
  }

  /// For todo
  checked() {
    this[`${this.type}`].checked = true;
    return this;
  }

  /// For equation
  expression(exp = 'e=mc^2') {
    this[`${this.type}`].expression = exp;
    return this;
  }

  /// For synced block
  original() {
    this[`${this.type}`].synced_from = null;
    return this;
  }

  /// For synced block
  sync(block_id) {
    this[`${this.type}`].synced_from = block_id;
    return this;
  }
  /// For link to page block
  page(id) {
    this[`${this.type}`] = { type: 'page_id', page_id: id };
    return this;
  }

  /// For link to page where page is a database
  database(id) {
    this[`${this.type}`] = { type: 'database_id', database_id: id };
    return this;
  }

  /// Add a single child block
  child(child = {}) {
    if (this[`${this.type}`].children == undefined) {
      this[`${this.type}`].children = [];
    }
    this[`${this.type}`].children.push({ ...child });
    // console.log(this.children);
    return this;
  }

  /// Add an array of child blocks
  children(...children) {
    const result = [];
    children.forEach((child) => {
      if (Array.isArray(child)) {
        result.push(...child);
      } else {
        result.push(child);
      }
    });
    this[`${this.type}`].children = result;
    return this;
    // this[`${this.type}`].children = children;
    // return this;
  }

  /// Sets the rich text array to the parameter of text object inputs
  text(...texts) {
    const result = [];
    texts.forEach((text) => {
      if (Array.isArray(text)) {
        result.push(...text);
      } else {
        result.push(text);
      }
    });
    this[`${this.type}`].rich_text = result;
    return this;
  }

  /// Returns text object starting with \n from a string, optional url
  /**
   *
   * @param {string} text string
   * @param {string} url string?
   * @returns {TextObject} a text object starting with \n
   */
  static line(text, url = '') {
    if (url == '') {
      return {
        type: 'text',
        text: {
          content: `\n${text}`,
        },
      };
    }
    return {
      type: 'text',
      text: {
        content: `\n${text}`,
        link: {
          url: url,
        },
      },
    };
  }

  /// Returns a text object, optional url and annotations
  /**
   * @param {string} text string
   * @param {Options} options {url:string, annotations:{}}
   * @returns {AnnotatedTextObject} a text object with annotations
   */
  static annoText(text, options) {
    let result = {
      type: 'text',
      text: {
        content: text,
      },
    };
    if (options.url != undefined) {
      result.text.link = { url: options.url };
    }
    if (options.annotations != undefined) {
      result.annotations = options.annotations;
    }
    return result;
  }

  /* Block Creators */
  /**
   * Returns an empty block
   */
  static empty() {
    return new NotionBlock('paragraph').text(NotionBlock.text(''));
  }

  static h1(text) {
    if (text !== undefined && typeof text === 'string') {
      return new NotionBlock('heading_1').text(new RichText(text));
    }
    return new NotionBlock('heading_1');
  }

  static h2(text) {
    return new NotionBlock('heading_2').text(new RichText(text));
  }

  static h3(text) {
    return new NotionBlock('heading_3').text(new RichText(text));
  }

  static columnList() {
    return new NotionBlock('column_list');
  }

  static column() {
    return new NotionBlock('column');
  }

  static callout(icon = '') {
    if (icon !== '' && typeof icon === 'string') {
      return new NotionBlock('callout').icon(icon);
    }
    return new NotionBlock('callout');
  }

  static numberListItem(text = '') {
    if (text !== '' && typeof text === 'string') {
      return new NotionBlock('numbered_list_item').text(new RichText(text));
    }
    return new NotionBlock('numbered_list_item');
  }
}

export class RichText {
  type = 'text';
  text = { content: '' };

  constructor(text = '') {
    this.text.content = text;
    return this;
  }

  link(url) {
    this.text.link = { url: url };
    return this;
  }

  color(color) {
    this.initAnnotations();
    this.annotations = { ...this.annotations, color: color };
    return this;
  }

  bold() {
    this.initAnnotations();
    this.annotations = { ...this.annotations, bold: true };
    return this;
  }

  italic() {
    this.initAnnotations();
    this.annotations = { ...this.annotations, italic: true };
    return this;
  }

  strikethrough() {
    this.initAnnotations();
    this.annotations = { ...this.annotations, strikethrough: true };
    return this;
  }

  underline() {
    this.initAnnotations();
    this.annotations = { ...this.annotations, underline: true };
    return this;
  }

  newline() {
    const t = { content: `\n${this.text.content}` };
    this.text = t;
    return this;
  }

  initAnnotations() {
    if (this.annotations === undefined) {
      this.annotations = {};
    }
  }

  static Color = {
    Default: 'default',
    Gray: 'gray',
    Red: 'red',
    Orange: 'orange',
    Yellow: 'yellow',
    Green: 'green',
    Blue: 'blue',
    Purple: 'purple',
    Pink: 'pink',
    Brown: 'brown',
    DefaultBg: 'default_background',
    GrayBg: 'gray_background',
    RedBg: 'red_background',
    OrangeBg: 'orange_background',
    YellowBg: 'yellow_background',
    GreenBg: 'green_background',
    BlueBg: 'blue_background',
    PurpleBg: 'purple_background',
    PinkBg: 'pink_background',
    BrownBg: 'brown_background',
  };

  static empty() {
    return new RichText();
  }

  static newline() {
    return new RichText('\n');
  }

  static splitLines(...texts) {
    let t = texts.reduce((prev, curr) => {
      prev.push(curr);
      prev.push(this.newline());
      return prev;
    }, []);
    t.pop();
    return t;
  }
}
