//This file has the following components:
//    - percentEncoding and decoding utilities.
//    - reserved characters.
//    - unreserved  = ALPHA / DIGIT, "-", ".", "_", "~"

const reserved = [":", "/", "?", "#", "[", "]", "@"];
const unreserved = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~".split('');


//Only time this should happen is when generating the URI (according to RFC 3986)
function percentEncode(str) {
    //loop through str. If str[i] isn't reserved/unreseved. percentEncode it
    let encoded = '';

    for (let i = 0; i < str.length; i++) {
        if (!(reserved.includes(str[i]) || unreserved.includes(str[i]))) {
            const hex = str[i].charCodeAt(0).toString(16).toUpperCase();

            encoded += '%' + (hex.length === 1 ? '0' : '') + hex;
        } else {
            encoded += str[i];
        }
    }

    return encoded;
}


//Unreserved characters can be decoded at any time, whereas reserved characters
//should be decoded after the generic parser did its job.
function percentDecode(encoded) {
    //loop through the encoded string, when you encouter % take the next two digits in hex
    //and convert them into their character counterpart.
    let decoded = '';

    for (let i = 0; i < encoded.length; i++) {
        if (encoded[i] === '%') {
            const hex = parseInt(encoded[i+1] + encoded[i+2], 16);
            const char = String.fromCharCode(hex);

            decoded += char;
            i += 2;
        } else {
            decoded += encoded[i];
        }
    }

    return decoded;
}

