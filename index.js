//This file contains the logic for generically parsing URIs
//The generic URI syntax consists of a hierarchical sequence of
//components referred to as the scheme, authority, path, query, and
//fragment.

let uri = 'foo://example.com:8042/over/there?name=ferret#nose';
uri = 'foo://username@example.com:8042/over/there?name=ferret#nose';

//Defining the components regex
const schemeRegex = /^[a-zA-Z][a-zA-Z0-9+.-]*/
const authorityRegex = /^(?:([a-zA-Z0-9\-._~%!$&'()*+,;=:]*?)@)?([a-zA-Z0-9\-._~%]*|\[[a-fA-F0-9:.]+\])(?::(\d*))?/;
const pathRegex = /^\/?([a-zA-Z0-9\-._~%!$&'()*+,;=:@\/]*)/;
const queryRegex = /^([a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]*)/;
const fragmentRegex = /^([a-zA-Z0-9\-._~%!$&'()*+,;=:@/?]*)/;


function parseURI(uri) {

    let syntaxComponents = {
        scheme: '',
        authority: {
            auth: '',
            host: '',
            port: '',
        },
        path: '',
        query: '',
        fragment: ''
    }

    const scheme = uri.match(schemeRegex);

    if (scheme) {
        syntaxComponents.scheme = scheme[0];
        uri = uri.slice(scheme[0].length + 3);
    }

    const authority = uri.match(authorityRegex);

    if (authority) {
        syntaxComponents.authority = {
            'auth': authority[1] || '',
            'host': authority[2] || '',
            'port': authority[3] || '',
        };
        uri = uri.slice(authority[0].length + 1);
    }

    const path = uri.match(pathRegex);

    if (path) {
        syntaxComponents.path = path[0];
        uri = uri.slice(path[0].length);
    }

    const query = uri.match(queryRegex);

    if (query) {
        syntaxComponents.query = query[0];
        uri = uri.slice(query[0].length + 1);
    }

    const fragment = uri.match(fragmentRegex);

    if (fragment) {
        syntaxComponents.fragment = fragment[0];
        uri = uri.slice(fragment[0].length + 1);
    }
    console.log(syntaxComponents);
    return syntaxComponents;
}

parseURI(uri);
