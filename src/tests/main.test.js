"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var request = require("supertest");
var index_1 = require("../index");
var chai_1 = require("chai");
var addresses = [
    '0x0D625029E21540aBdfAFa3BFC6FD44fB4e0A66d0',
    '0x89Ea5CCF7acC1c0319DD16dEe4349879eB6D0965',
    '0x7d38B5C5639335605FFD0CbD1835a8dA06229454',
    '0xcA6B850102A2f95CE7088edA2F62469e1D90fdE8',
    '0x0bC0cdFDd36fc411C83221A348230Da5D3DfA89e',
    '0x42813a05ec9c7e17aF2d1499F9B0a591B7619aBF',
    '0x0D112a449D23961d03E906572D8ce861C441D6c3',
    '0x8600f6e9cd3406f8173749a582bc993e74ed7be8',
];
describe('Reserve tests', function () {
    before(function () {
        index_1.env.inTest = true;
    });
    after(function () {
        (0, index_1.closeServer)();
    });
    it('checking default reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .get('/reserved')
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('freeing unexistent reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)["delete"]('/free')
                        .send({ token: 220, wallet: addresses[0], hash: (0, index_1.hash)(addresses[0], 220, false) })
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .get('/is-reserved/?token=555')
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([false]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reserve token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .put('/reserve')
                        .send({ token: 555, test: true, wallet: addresses[0], hash: (0, index_1.hash)(addresses[0], 555, false) })
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([555]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .get('/is-reserved/?token=555')
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([true]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .get('/reserved')
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([555]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking expiration', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new Promise(function (rs) { return setTimeout(rs, 600); })];
                case 1:
                    _a.sent(); // delay to make token expired
                    return [4 /*yield*/, request(index_1.app)
                            .get('/reserved')
                            .set('Accept', 'application/json')];
                case 2:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reserve token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .put('/reserve')
                        .send({ token: 333, test: true, wallet: addresses[0], hash: (0, index_1.hash)(addresses[0], 333, false) })
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([333]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('reserve another token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .put('/reserve')
                        .send({ token: 444, test: true, wallet: addresses[0], hash: (0, index_1.hash)(addresses[0], 444, false) })
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([333, 444]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .get('/reserved')
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([333, 444]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('free token', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)["delete"]('/free')
                        .send({ token: 333, wallet: addresses[0], hash: (0, index_1.hash)(addresses[0], 333, false) })
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([444]);
                    return [2 /*return*/];
            }
        });
    }); });
    it('checking reserve', function () { return __awaiter(void 0, void 0, void 0, function () {
        var response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, request(index_1.app)
                        .get('/reserved')
                        .set('Accept', 'application/json')];
                case 1:
                    response = _a.sent();
                    (0, chai_1.expect)(response.headers["content-type"]).match(/json/);
                    (0, chai_1.expect)(response.status).equal(200);
                    (0, chai_1.expect)(response.body).eql([444]);
                    return [2 /*return*/];
            }
        });
    }); });
});
