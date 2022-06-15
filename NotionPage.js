export default class NotionPage {
  constructor(dbId, title) {
    this.parent = { database_id: dbId };
    this.properties = {
      title: {
        title: [
          {
            text: {
              content: title,
            },
          },
        ],
      },
    };
  }

  cover(url) {
    this['cover'] = {
      type: 'external',
      external: {
        url: url,
      },
    };
    return this;
  }

  icon(icon) {
    if (icon.includes('http')) {
      this['icon'] = {
        type: 'external',
        external: {
          url: icon,
        },
      };
      return this;
    }
    this['icon'] = {
      type: 'emoji',
      emoji: icon,
    };
    return this;
  }

  property(name, property) {
    const properties = this.properties;
    this.properties = { ...properties, [name]: property };
    return this;
  }

  props(...props) {
    props.forEach((prop) => {
      const p = this.properties;
      this.properties = { ...p, ...prop };
    });
    return this;
  }

  child(child = {}) {
    if (this.children == undefined) {
      this.children = [];
    }
    this.children.push({ ...child });
    return this;
  }
}
