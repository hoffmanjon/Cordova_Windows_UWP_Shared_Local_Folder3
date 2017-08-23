This is a test project to go with my question on Ionic's forum located here:  https://forum.ionicframework.com/t/windows-uwp-shared-local-folder-being-removed/91905/3 

At issue is we are creating a Ionic 2 application that needs to share data between all users on a Windows UWP system so we wish to use shared local folders and documented here by Microsoft:  https://blogs.windows.com/buildingapps/2016/05/24/sharing-your-local-app-data/#TMWySROFzDtGLUzR.97

The POC plugin by itself is located here:  https://github.com/hoffmanjon/Cordova_Windows_UWP_Shared_Local_Folder_plugin

The problem arises when we attempt to do an update of our app.  When the update is preformed the shared local folder is removed.  We created a native application to test if this is unique to cordova or if it is a Microsoft issue and when we updated the native application the data in the shared local folder was not removed.

We also tried installing the application for multiple users on the same system.  When we install the Ionic application with a version that another user has, the shared local folder is not removed however as soon as we update to a new version then the shared local folder is removed.  I belive this means it is isolated to an update and not by the install process itself.

# Configure Windows
You will need to set a group policy to get the shared local folders working. In the in the "Using Shared Local" section of this page: https://blogs.windows.com/buildingapps/2016/05/24/sharing-your-local-app-data it describes how to change the policy and which one to change.

# How project was created
ionic start FileSharePOC3 blank
cd FileSharePOC3
cordova platform add windows

edited config.xml to add `<preference name="windows-target-version" value="10.0" />`

cordova plugin add https://github.com/hoffmanjon/Cordova_Windows_UWP_Shared_Local_Folder_plugin.git

`added code`

Change the .gitignore file to the /www directory was included.

# Building Project
In the directory that contains the clone to this project run `cordova prepare`.  Then run `npm install`.  If there are no errors you should be ready to build the project.

# Reproduce issue
build several versions of the project changing the version number, in line 2 of the config.xml file, for each build `<widget id="io.ionic.starter" version="0.0.4" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">`

You will want to increase the version number for each build so you can test updating the app to see the shared local files being removed.  Use the following steps to reproduce the issue:

1.  Now, within a powershell prompt, go to `platforms/windows/AppPackages/<first version of the app>` and install the app by running the `.\Add-AppDevPackage.ps1` powershell script.
 
2.  Once installed run the `filesharetest` application from the start menu and click on the `Save Shared File` button.  You should see the message `Return- mysharedfile.txt` in the message box letting you know the shared file was saved properly.  You can verify this by using the following steps:

*  Open Notepad as an Administrator by right clicking on it and slecting the `More` option and then selecting `Run as Administrator`
*  Now select `File` -> `Open` and browse to `c:\ProgramData\Microsoft\Windows\AppRepository\Families\com.ionicframework.filesharetest<<some combo of letters and numbers>>\SharedLocalFolder` and you should see the `mysharedfile file`  If you do not see the io.ionic.starter directory sort by Date Modified to see the newest directory at the top.
*  Close notepad so it does not lock the directory.

3.  Now that you verified the shared file is there, repeat step one and install a version of the app with a higher verison number but do not run the app.  Instead open notepad as an administrator and browse to `c:\ProgramData\Microsoft\Windows\AppRepository\Families\io.ionic.starter_<<some combo of letters and numbers>>` and you will see that the `SharedLocalFolder` has been removed.


