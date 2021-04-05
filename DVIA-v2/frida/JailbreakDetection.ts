var className = "JailbreakDetection";
var funcName = "+ isJailbroken";
var hook = eval('ObjC.classes.' + className + '["' + funcName + '"]');
const { NSString } = ObjC.classes;

// 替换实例函数的返回值 see: https://frida.re/docs/javascript-api/#objc
Interceptor.attach(hook.implementation, {
    onLeave: function(retval) {
        console.log("[*] Class Name: " + className);
        console.log("[*] Method Name: " + funcName);
        console.log("\t[-] Type of return value: " + typeof retval);
        console.log("\t[-] Original Return Value: " + retval);
        var val = ptr("0x0"); // return false
        console.log("\t[-] Original Return new Value: " + val);
        retval.replace(val);
    },
 
    onEnter: function(args){
        var className = ObjC.Object(args[0]);
        var methodName = args[1];
        // var urlString = ObjC.Object(args[2]);
 
        console.log("className: " + className.toString());
        console.log("methodName: " + methodName.readUtf8String());
        // console.log("urlString: " + urlString.toString());
        // console.log("-----------------------------------------");
 
        // urlString = ObjC.classes.NSString.stringWithString_("http://www.baidu.com")
        // console.log("newUrlString: " + urlString.toString());
        // console.log("-----------------------------------------");
    }
});