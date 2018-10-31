/**
 * @author xiongjian
 * @email xiongjian@xx.com
 * @create date 2018-10-31 14:32:37
 * @modify date 2018-10-31 14:32:37
 * @desc [description]
*/
const schedule = require('node-schedule');
const { exec } = require('child_process');
const moment = require('moment');
const fs = require('fs');

const fileAbsPath = `/Users/didi/files/work-didi/doc/overtime.md`;

(function scheduleCronstyle() {
    const timmer = schedule.scheduleJob(/* { hour: 12, minute: 20, dayOfWeek: [1, 2, 3, 4, 5, 6, 7] } */`30 0 20 * * *`, function () {
        console.log('scheduleCronstyle:' + new Date());
        notificationConfirm()
    });
}())

function notificationMac(title = '', subtitle = '', content = '') {
    exec(`osascript -e 'display notification "${content}" with title "${title}" subtitle "${subtitle}"'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
    });
}

function notificationUser(text, isSuccess = true) {
    notificationMac('通知', '确定加班', `添加 ${text} ${isSuccess ? '成功' : '失败'}`)
}

function notificationConfirm() {
    const [yes, no] = ['加了', '没有']
    exec(`osascript -e 'display dialog "今天是否加班" buttons {"${yes}", "${no}"} default button 1'`, (error, stdout, stderr) => {
        if (error) {
            console.error(`exec error: ${error}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        if (stdout.includes(yes)) {
            appendOvertimeLog()
            return
        }
        notificationMac('通知', '没加班', `${moment().format('YYYY-MM-DD')}今天没有加班`)
    });
}

function appendOvertimeLog() {
    const toDay = moment().format('YYYY-MM-DD');
    const text = `    ${toDay} 加班晚餐`;
    try {
        fs.appendFile(fileAbsPath, `\n${text}`, 'utf8', (err) => {
            if (err) {
                notificationUser(text + err.toString(), false)
            }
            notificationUser(text)
        });
        // fs.close();
    } catch (error) {
        notificationUser(text + err.toString(), false)
    }
}