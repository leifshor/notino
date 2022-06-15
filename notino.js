import Prop from './NotionProp';
import Filter from './NotionFilter';
import Page from './NotionPage';
import { NotionBlock, RichText } from './NotionBlock';
import Annotation from './NotionAnnotation';

class Notino {
  static check() {
    return 'v1.0.0';
  }

  static icon = (icon) => {
    if (icon.includes('http')) {
      return {
        type: 'external',
        external: {
          url: icon,
        },
      };
    }
    return {
      type: 'emoji',
      emoji: icon,
    };
  };

  static cover = (url) => {
    return {
      type: 'external',
      external: {
        url: url,
      },
    };
  };

  static idFromUrl = (url) => {
    return url.substring(url.length - 32, url.length);
  };
}

export {
  Page as Page,
  Prop as Prop,
  Filter as Filter,
  NotionBlock as Block,
  RichText as RichText,
  Annotation as Annotation,
  Notino as Notino,
};
