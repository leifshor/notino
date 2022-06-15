export default class NotionFilter {
  // Numbers
  static LessThan = 'less_than';
  static LessOrEqual = 'less_than_or_equal_to';
  static Equals = 'equals';
  static NotEquals = 'does_not_equal';
  static GreaterThan = 'greater_than';
  static GreaterOrEqual = 'greater_than_or_equal_to';
  // Strings and general
  static StartsWith = 'starts_with';
  static EndsWith = 'ends_with';
  static Contains = 'contains';
  static NotContains = 'does_not_contain';
  static Empty = 'is_empty';
  static NotEmpty = 'is_not_empty';
  // Dates
  static Before = 'before';
  static OnOrBefore = 'on_or_before';
  static After = 'after';
  static OnOrAfter = 'on_or_after';
  static PastWeek = 'past_week';
  static NextWeek = 'next_week';
  static PastMonth = 'past_month';
  static NextMonth = 'next_month';
  static PastYear = 'past_year';
  static NextYear = 'next_year';
  // Rollups
  static Any = 'any';
  static Every = 'every';
  static None = 'none';
  static String = 'string';

  static create(type, name, condition, value, rollup = null) {
    if (rollup == null) {
      return {
        property: name,
        [type]: {
          [condition]: value,
        },
      };
    }
    return {
      [rollup]: {
        property: name,
        [type]: {
          [condition]: value,
        },
      },
    };
  }

  /// Returns object with key [or] and value [filters], pass an array
  static or(filters) {
    if (filters[0] == undefined) {
      console.dir({ or: [filters] });
      return {
        or: [filters],
      };
    }
    console.dir({ or: filters });
    return {
      or: filters,
    };
  }
}
