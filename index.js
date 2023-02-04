#!/usr/bin/env node
const fs = require('fs');
const request = require('request')

const path = 'dist/'

let strChinaList, strGoogleHostsList, strChinaWhiteList, strChinaBlackList

fs.mkdir(path, error => {
})

request({
    url: 'https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/master/accelerated-domains.china.conf',
    method: 'GET'
}, (error, response, body) => {
    strChinaList = body
    strChinaList = strChinaList.replace(/#.+/g, '')
    strChinaList = strChinaList.replace(/server=\/(.+)\/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g, '[/$1/]10\.0\.10\.1')
    strChinaList = strChinaList.replace(/([\s])[\s]*/g, '$1')
    strChinaList = strChinaList.trim()
    fs.writeFileSync(path + 'ChinaList.txt', strChinaList, 'UTF-8')
    request({
        url: 'https://raw.githubusercontent.com/googlehosts/hosts/master/hosts-files/dnsmasq.conf',
        method: 'GET'
    }, (error, response, body) => {
        strGoogleHostsList = body
        strGoogleHostsList = strGoogleHostsList.replace(/#.+/g, '')
        strGoogleHostsList = strGoogleHostsList.replace(/address=\/(.+)\/[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+/g, '[/$1/]198\.18\.0\.2')
        strGoogleHostsList = strGoogleHostsList.replace('[/localhost/]198\.18\.0\.2', '')
        strGoogleHostsList = strGoogleHostsList.replace(/([\s])[\s]*/g, '$1')
        strGoogleHostsList = strGoogleHostsList.trim()
        fs.writeFileSync(path + 'GoogleHostsList.txt', strGoogleHostsList, 'UTF-8')
        strChinaWhiteList = strChinaList + '\n' + strGoogleHostsList + '\n198.18.0.2'
        fs.writeFileSync(path + 'ChinaWhiteList.txt', strChinaWhiteList, 'UTF-8')
        strChinaBlackList = strChinaList + '\n' + strGoogleHostsList + '\n10.0.10.1'
        fs.writeFileSync(path + 'ChinaBlackList.txt', strChinaBlackList, 'UTF-8')
    });
});

let strHalfLifeList

request({
    url: 'https://raw.githubusercontent.com/o0HalfLife0o/list/master/ad.txt',
    method: 'GET'
}, (error, response, body) => {
    strHalfLifeList = body
    strHalfLifeList = strHalfLifeList.replace(/! Checksum: (.+)/, '')
    strHalfLifeList = strHalfLifeList.replace(/! Title: (.+)/, '! Title: HalfLifeList')
    strHalfLifeList = strHalfLifeList.trim()
    fs.writeFileSync(path + 'HalfLifeList.txt', strHalfLifeList, 'UTF-8')
});

let strAntiAD

request({
    url: 'https://anti-ad.net/easylist.txt',
    method: 'GET'
}, (error, response, body) => {
    strAntiAD = body
    strAntiAD = strAntiAD.replace(/!Title: (.+)/, '!Title: AntiAD')
    strAntiAD = strAntiAD.trim()
    fs.writeFileSync(path + 'AntiAD.txt', strAntiAD, 'UTF-8')
});
