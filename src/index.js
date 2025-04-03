"use strict";
var _a;
exports.__esModule = true;
exports.closeServer = exports.app = exports.hash = exports.env = void 0;
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var md5 = require("md5");
exports.env = {
    inTest: false
};
var hash = function (address, token, mumbai) {
    if (mumbai) {
        return md5("glass-".concat(address, "-").concat(token, "-trident")).substring(4, 10);
    }
    return md5("magnet-".concat(address, "-").concat(token, "-stadium")).substring(4, 10);
};
exports.hash = hash;
var checkValidity = function (address, token, _hash, mumbai) {
    if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
        return false;
    }
    if ((0, exports.hash)(address, token, mumbai) !== _hash) {
        console.log('WRONG HASH', (0, exports.hash)(address, token, mumbai), _hash);
    }
    return (0, exports.hash)(address, token, mumbai) === _hash;
};
exports.app = express();
exports.app.use(bodyParser.urlencoded({ extended: false }));
exports.app.use(bodyParser.json());
exports.app.use(cors());
var reserveMapPolygon = new Map();
var reserveMapMumbai = new Map();
var microCache = [];
var microCacheTimestamp = 0;
var getReserved = function (mumbai) {
    var reserveMap = mumbai ? reserveMapMumbai : reserveMapPolygon;
    var result = [];
    var now = new Date().getTime();
    if (now - microCacheTimestamp < 100 /* ms */)
        return microCache;
    reserveMap.forEach(function (value, key, map) {
        if (value > now) {
            result.push(key);
        }
        else {
            map["delete"](key);
        }
    });
    microCache = result;
    microCacheTimestamp = now;
    return result;
};
exports.app.get('/reserved', function (_, res) {
    res.json(getReserved(false));
});
exports.app.get('/reserved-mumbai', function (_, res) {
    res.json(getReserved(true));
});
exports.app.get('/is-reserved', function (req, res) {
    var _a = req.query, token = _a.token, mumbai = _a.mumbai;
    var reserveMap = mumbai ? reserveMapMumbai : reserveMapPolygon;
    var now = new Date().getTime();
    var reserved = reserveMap.has(+token) && reserveMap.get(+token) > now;
    res.json([reserved]);
});
exports.app.use(function (req, _, next) {
    if (!exports.env.inTest)
        console.log('ACCESS LOG', req.url);
    next();
});
exports.app.post('/reserve', function (req, res) {
    var _a = req.body, token = _a.token, wallet = _a.wallet, hash = _a.hash, test = _a.test, mumbai = _a.mumbai;
    var reserveMap = mumbai ? reserveMapMumbai : reserveMapPolygon;
    var reserved = reserveMap.has(+token) && reserveMap.get(+token) > new Date().getTime();
    if (reserved) {
        res.json({ success: false });
        return;
    }
    if (checkValidity(wallet, +token, hash, Boolean(mumbai))) {
        var ttl = test ? 0.5 : 5 * 60; // 0.5 seconds for test; 5 minutes to rule them all
        reserveMap.set(+token, new Date().getTime() + ttl * 1000);
        microCacheTimestamp = 0;
    }
    res.json({ success: true, reserve: getReserved(Boolean(mumbai)) });
});
exports.app["delete"]('/free', function (req, res) {
    var _a = req.body, token = _a.token, wallet = _a.wallet, hash = _a.hash, mumbai = _a.mumbai;
    var reserveMap = mumbai ? reserveMapMumbai : reserveMapPolygon;
    if (checkValidity(wallet, +token, hash, Boolean(mumbai))) {
        reserveMap["delete"](+token);
        microCacheTimestamp = 0;
    }
    res.json(getReserved(Boolean(mumbai)));
});
exports.app.use(function (_, res) {
    res.status(404).end();
});
var server = exports.app.listen(parseInt((_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000'), '127.0.0.1', function () {
    var _a;
    console.log('server started', (_a = process.env.PORT) !== null && _a !== void 0 ? _a : '8000');
});
var closeServer = function () { return server.close(); };
exports.closeServer = closeServer;
