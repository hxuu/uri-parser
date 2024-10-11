// This file contains all the utilities for handling URI components.
// The basic idea behind the handlers is using regex.

const HEXDIG = /[0-9A-Fa-f]/.source;

const ALPHA = /[a-zA-Z]/.source;
const DIGIT = /[0-9]/.source;
const RESERVED = /[:/?#\[\]@]/.source;  // Corrected to ensure correct escaping
const UNRESERVED = /[A-Za-z0-9\-._~]/.source;
const SUB_DELIMS = /[!$&'()*+,;=]/.source;  // Added .source for consistency
const PCT_ENCODED = `%${HEXDIG}${HEXDIG}`;  // Keep as string for regex creation

// Each URI starts with a scheme.
//       scheme      = ALPHA *( ALPHA / DIGIT / "+" / "-" / "." )
const schemeRegex = new RegExp(`^${ALPHA}(${ALPHA}|${DIGIT}|\\+|-|\\.)*`);

//      authority   = [ userinfo "@" ] host [ ":" port ]
//       userinfo    = *( unreserved / pct-encoded / sub-delims / ":" )
const userinfoRegex = `(${UNRESERVED}|${PCT_ENCODED}|${SUB_DELIMS}|:)*`;

// Regex for host (can include ALPHA, DIGIT, '.', and '-')
//       host        = IP-literal / IPv4address / reg-name
const IPvFuture = `v${HEXDIG}+\\.(${UNRESERVED}|${SUB_DELIMS}|:)+`;

const DEC_OCTET = `([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])`;
const h16 = `${HEXDIG}{1,4}`;
const ls32 = `(${h16}:${h16}|${DEC_OCTET.source}\\.${DEC_OCTET.source}\\.${DEC_OCTET.source}\\.${DEC_OCTET.source})`;

// IPv6address patterns
const IPv6_1 = `${h16}:${h16}:${h16}:${h16}:${h16}:${h16}:${ls32}`;
const IPv6_2 = `::${h16}:${h16}:${h16}:${h16}:${h16}:${ls32}`;
const IPv6_3 = `(${h16})?::${h16}:${h16}:${h16}:${h16}:${ls32}`;
const IPv6_4 = `(${h16}:)?${h16}?::${h16}:${h16}:${h16}:${ls32}`;
const IPv6_5 = `(${h16}:){0,2}${h16}?::${h16}:${h16}:${ls32}`;
const IPv6_6 = `(${h16}:){0,3}${h16}?::${h16}:${ls32}`;
const IPv6_7 = `(${h16}:){0,4}${h16}?::${ls32}`;
const IPv6_8 = `(${h16}:){0,5}${h16}?::${h16}`;
const IPv6_9 = `(${h16}:){0,6}${h16}?::`;

// Combine all IPv6 patterns
const IPv6address = `(${IPv6_1}|${IPv6_2}|${IPv6_3}|${IPv6_4}|${IPv6_5}|${IPv6_6}|${IPv6_7}|${IPv6_8}|${IPv6_9})`;

// IP-literal = "[" ( IPv6address / IPvFuture ) "]"
const IP_LITERAL = `\\[(${IPv6address}|${IPvFuture})\\]`;

// IPv4address = dec-octet "." dec-octet "." dec-octet "." dec-octet
const IPv4_ADDRESS = `${DEC_OCTET}\\.${DEC_OCTET}\\.${DEC_OCTET}\\.${DEC_OCTET}`;

// reg-name = *( unreserved / pct-encoded / sub-delims )
const REG_NAME = `(${UNRESERVED}|${PCT_ENCODED}|${SUB_DELIMS})*`;

// host = IP-literal / IPv4address / reg-name
const hostRegex = new RegExp(`(${IP_LITERAL}|${IPv4_ADDRESS}|${REG_NAME})`);

// port = ":" DIGIT+
const portRegex = `(:${DIGIT}+)?`;

const authorityRegex = new RegExp(`(${userinfoRegex}@)?(${hostRegex.source})${portRegex}`);

// Path components
const pchar = `(${UNRESERVED}|${PCT_ENCODED}|${SUB_DELIMS}|:|@)`;

// Segment definitions
const segment = `(${pchar}*)`;  // *pchar
const segment_nz = `(${pchar}+)`;  // 1*pchar
const segment_nz_nc = `(${UNRESERVED}|${PCT_ENCODED}|${SUB_DELIMS}|@)+`;  // 1*(unreserved / pct-encoded / sub-delims / "@")

// Path definitions
const path_abempty = `(${segment})*`;  // *( "/" segment )
const path_absolute = `/${segment_nz}(${segment})*`;  // "/" [ segment-nz *( "/" segment ) ]
const path_noscheme = `${segment_nz_nc}(${segment})*`;  // segment-nz-nc *( "/" segment )
const path_rootless = `${segment_nz}(${segment})*`;  // segment-nz *( "/" segment )
const path_empty = '';  // 0<pchar

const pathRegex = new RegExp(`(${path_abempty}|${path_absolute}|${path_noscheme}|${path_rootless}|${path_empty})`);

//       query       = *( pchar / "/" / "?" )
const queryRegex = new RegExp(`(${pchar}|\\/|\\?)*`);

//       fragment    = *( pchar / "/" / "?" )
const fragmentRegex = new RegExp(`(${pchar}|\\/|\\?)*`);



// After all of this. Here's the full regex
// URI         = scheme ":" hier-part [ "?" query ] [ "#" fragment ]
      //hier-part   = "//" authority path-abempty
      //            / path-absolute
      //            / path-rootless
      //            / path-empty
const hierPartRegex = new RegExp(`((//(${authorityRegex.source})(${path_abempty}))|(${path_absolute}|${path_rootless}|${path_empty}))`);
const uriRegex = new RegExp(`(${schemeRegex.source}):(${hierPartRegex.source})(${queryRegex.source})?(#(${fragmentRegex.source}))?`);


module.exports = {
  uriRegex,
  schemeRegex,
  authorityRegex,
  pathRegex,
  queryRegex,
  fragmentRegex,
};

