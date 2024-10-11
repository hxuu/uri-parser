//This file has the following components:
//    - percentEncoding and decoding utilities.
//    - reserved characters.
//    - unreserved  = ALPHA / DIGIT, "-", ".", "_", "~"



//Only time this should happen is when generating the URI (according to RFC 3986)
//This function doesn't handle characters outside the Basic Multilingual Plane
function percentEncode(char) {
    const charCode = char.charCodeAt(0);
    let encoded = '';

    if (charCode < 16) {
        // character can be represented using a single hex digit
        encoded = '%0' + charCode.toString(16).toUpperCase();
    } else if (charCode < 128) {
        // character can be represented using two hex digits
        encoded = '%' + charCode.toString(16).toUpperCase();
    } else if (charCode < 2048) {
        // character is unicode that can be converted to two byte UTF-8
        encoded =
            '%'
            + ((charCode >> 6) | 192).toString(16).toUpperCase() +
            '%'
            + ((charCode & 63) | 128).toString(16).toUpperCase();
    } else {
        // character is unicode that will be ocnverted to more than two bytes in UTF-8
        // say three bytes which will equal 3 duplets of hex digits
        encoded =
            '%'
            + ((charCode >> 12) | 224).toString(16).toUpperCase() +
            '%'
            + ((charCode >> 6) | 128).toString(16).toUpperCase() +
            '%'
            + ((charCode & 63) | 128).toString(16).toUpperCase();
    }

    return encoded;
}


//Unreserved characters can be decoded at any time, whereas reserved characters
//should be decoded after the generic parser did its job.
//this function percent decodes a whole string.
function percentDecode(str) {
    let decoded = '';
    let i = 0;
    const len = str.length;

    while (i < len){
        //I'll be assuming that we're already at the %, thus we extract the two hex digits
        const decimal = parseInt(str.substr((i + 1), 2), 16);

        if (decimal < 128) {
            // decimal is in the US-ASCII set.
            decoded += String.fromCharCode(decimal);
            i += 3;
        } else if (decimal > 192 && decimal < 224) {
            if (len - i >= 6) {
                // decimal is in the UTF-8 with two bytes
                // we have to reconstruct the character
                const decimal2 = parseInt(str.substr((i + 4), 2), 16);

                // we have the two parts, how to concatenate the first with second.
                decoded += String.fromCharCode((decimal & 31) << 6 | (decimal2 & 63));
                i += 6;
            }
        } else {
            if (len - i >= 9) {
                // decimal is in the UTF-8 with three bytes
                // we have to reconstruct the character
                const decimal2 = parseInt(str.substr((i + 4), 2), 16);
                const decimal3 = parseInt(str.substr((i + 7), 2), 16);

                decoded += String.fromCharCode((decimal & 15) << 12 | ((decimal2 & 63) << 6) | (decimal3 & 63));
                i += 9;
            }
        }
    }

    return decoded;
}

