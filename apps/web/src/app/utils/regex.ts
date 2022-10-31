/* eslint-disable */

export const VALID_CSS =
  /((?:^\s*)([\w#.@*,:\-.~+:>,*\s]+)\s*{(?:[\s]*)((?:[A-Za-z\- \s]+[:]\s*(['"0-9\w .,\/()\-!%]+|(#(?:[0-9a-fA-F]{3,4}){1,2})|(url\(["']https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)+["']\)));)*)*\s*}(?:\s*))/gim;

export const VALID_HEX_COLOR = /^#(?:[0-9a-fA-F]{3,4}){1,2}$/;

export const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
