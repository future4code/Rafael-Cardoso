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
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var baseUrl = 'https://us-central1-labenu-apis.cloudfunctions.net/labenews';
var createUser = function (name, email) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.put(baseUrl + "/subscribers", { name: name, email: email })];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
var createNews = function (title, content, date) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        axios_1.default.put(baseUrl + "/news", { title: title, content: content, date: date });
        return [2];
    });
}); };
var getAllSubscribers = function () { return __awaiter(void 0, void 0, void 0, function () {
    var subscribers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, axios_1.default.get(baseUrl + "/subscribers/all")];
            case 1:
                subscribers = _a.sent();
                return [2, subscribers.data.map(function (item) {
                        return {
                            id: item.id,
                            name: item.name,
                            email: item.email
                        };
                    })];
        }
    });
}); };
var sendNotification = function (subscribers, message) { return __awaiter(void 0, void 0, void 0, function () {
    var promiseArray, _i, subscribers_1, item, subscriberId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                promiseArray = [];
                for (_i = 0, subscribers_1 = subscribers; _i < subscribers_1.length; _i++) {
                    item = subscribers_1[_i];
                    subscriberId = item.id;
                    promiseArray.push(axios_1.default.post(baseUrl + "/notifications/send", { subscriberId: subscriberId, message: message }));
                }
                return [4, Promise.all(promiseArray)];
            case 1:
                _a.sent();
                return [2];
        }
    });
}); };
var createAndSendNotifications = function (title, content, date, message) { return __awaiter(void 0, void 0, void 0, function () {
    var allSubscribers;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, createNews(title, content, date)];
            case 1:
                _a.sent();
                return [4, getAllSubscribers()];
            case 2:
                allSubscribers = _a.sent();
                return [4, sendNotification(allSubscribers, message)];
            case 3:
                _a.sent();
                return [2];
        }
    });
}); };
var getAllNotifications = function () { return __awaiter(void 0, void 0, void 0, function () {
    var allSubscribers, notificationsArray, _i, allSubscribers_1, item, notifications;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, getAllSubscribers()];
            case 1:
                allSubscribers = _a.sent();
                notificationsArray = [];
                for (_i = 0, allSubscribers_1 = allSubscribers; _i < allSubscribers_1.length; _i++) {
                    item = allSubscribers_1[_i];
                    notificationsArray.push(axios_1.default.get(baseUrl + "/subscribers/" + item.id + "/notifications/all"));
                }
                return [4, Promise.all(notificationsArray)];
            case 2:
                notifications = _a.sent();
                return [2, notifications.map(function (item) { return item.data; })];
        }
    });
}); };
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b, err_1;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 2, , 3]);
                createUser('eu', 'eu@eu.com');
                console.log('Usuário criado com sucesso');
                createAndSendNotifications('Boas novas', 'Sempre novidades', 1590522289000, 'Bem-vindos!');
                console.log('Notícia criada e enviada com sucesso');
                _b = (_a = console).log;
                return [4, getAllNotifications()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [3, 3];
            case 2:
                err_1 = _c.sent();
                console.error(err_1);
                return [3, 3];
            case 3: return [2];
        }
    });
}); };
main();
//# sourceMappingURL=ex7.js.map