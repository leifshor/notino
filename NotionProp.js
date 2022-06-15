export default class NotionProp {
  // Properties
  static Title = 'title';
  static RichText = 'richtext';
  static Checkbox = 'checkbox';
  static Number = 'number';
  static Date = 'date';
  static Rollup = 'rollup';
  static Formula = 'formula';

  static select = (option) => {
    return {
      select: {
        name: option,
      },
    };
  };

  static multiselect = (...options) => {
    const optionsArray = options.reduce((prev, curr) => {
      prev.push({ name: curr });
      return prev;
    }, []);
    return {
      multi_select: optionsArray,
    };
  };

  static relation = (relationId) => {
    return {
      relation: [
        {
          id: relationId,
        },
      ],
    };
  };

  static relations = (...relationIds) => {
    let relations = relationIds.reduce((prev, curr) => {
      prev.push({ id: curr });
      return prev;
    }, []);
    return {
      relation: relations,
    };
  };

  static date = (dateText) => {
    return {
      date: {
        start: dateText,
      },
    };
  };

  static dateTime = (dateText, time = '08:00:00', zone = '+12:00') => {
    return {
      date: {
        start: dateText + time + zone,
      },
    };
  };

  static dateTimeEnd = (dateText, end, start = '00:00:00', zone = '+12:00') => {
    return {
      date: {
        start: dateText + start + zone,
        end: dateText + end + zone,
      },
    };
  };
}
