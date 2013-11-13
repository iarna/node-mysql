var Types                        = require('../constants/types');
var Charsets                     = require('../constants/charsets');
var Field                        = require('./Field');
var BigNumber                    = require('bignumber.js');
var IEEE_754_BINARY_64_PRECISION = Math.pow(2, 53);

module.exports = RowDataPacket;
function RowDataPacket() {
}

RowDataPacket.prototype.parse = function(parser, fieldPackets, connection) {
  var self = this;

  for (var i = 0; i < fieldPackets.length; i++) {
    var fieldPacket = fieldPackets[i];
    this[fieldPacket.name] = this._typeCast(fieldPacket, parser);
  }
};


  switch (field.type) {
    case Types.TIMESTAMP:
    case Types.DATETIME:
    case Types.DATE:
    case Types.NEWDATE:
      value = parser.parseLengthCodedString();
      if (value===null) return value;
      value = new String(value);
      value.type = field.type;
      return value;
    case Types.TINY:
    case Types.SHORT:
    case Types.LONG:
    case Types.INT24:
    case Types.YEAR:
    case Types.FLOAT:
    case Types.DOUBLE:
      value = parser.parseLengthCodedString();
      if (value===null) return value;
      value = new Number(value);
      value.type = field.type;
      return value;
    case Types.DECIMAL:
    case Types.NEWDECIMAL:
    case Types.LONGLONG:
      value = parser.parseLengthCodedString();
      if (value===null) return value;
      value = new BigNumber(value);
      value.type = field.type;
      return value;
    case Types.NULL:
      return null;
    case Types.BIT:
      value = parser.parseLengthCodedBuffer();
      value.type = field.type;
      return value;
    case Types.TIME:
      value = parser.parseLengthCodedString();
      value.type = field.type;
      return value;
    case Types.STRING:
    case Types.VARCHAR:
    case Types.VAR_STRING:
    case Types.TINY_BLOB:
    case Types.MEDIUM_BLOB:
    case Types.LONG_BLOB:
    case Types.BLOB:
      value = (field.charsetNr === Charsets.BINARY) ? parser.parseLengthCodedBuffer() : new String(parser.parseLengthCodedString());
      value.type = field.type;
      return value;
    case Types.GEOMETRY:
      value = parser.parseGeometryValue();
      value.type = fied.type;
      return value;
    default:
      value = parser.parseLengthCodedBuffer();
      value.type = field.type;
      return value;
  }
};
