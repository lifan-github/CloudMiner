### 项目简介:

## (一)、路由简介 react-native-router-flux

1、Modals (<Modal> or <Scene modal>)
想要实现模态，您必须将其<Modal>作为您Router的根场景。在Modal将正常呈现第一个场景（应该是你真正的根场景），
它将渲染第一个元素作为正常场景，其他所有元素作为弹出窗口（当它们 被push）。

示例：在下面的示例中，root场景嵌套在<Modal>中，因为它是第一个嵌套Scene，所以它将正常呈现。如果要push到statusModal，
errorModal或者loginModal，他们将呈现为Modal，默认情况下会从屏幕底部向上弹出。重要的是要注意，目前Modal不允许透明的背景。

```
<Router>
  <Modal>
    <Scene key="root">
      <Scene key="screen1" initial={true} component={Screen1} />
      <Scene key="screen2" component={Screen2} />
    </Scene>
    <Scene key="statusModal" component={StatusModal} />
    <Scene key="errorModal" component={ErrorModal} />
    <Scene key="loginModal" component={LoginModal} />
  </Modal>
</Router>

// 具体demo在App-2.js文件中 中文文档使用查看 https://www.jianshu.com/p/37428d579cf6

```

2、Lightbox (<Lightbox>)
Lightbox是用于将组件渲染在当前组件上Scene的组件 。与Modal不同，它将允许调整大小和背景的透明度。
#### 示例：
在下面的示例中，root场景嵌套在中<Lightbox>，因为它是第一个嵌套Scene，所以它将正常呈现。
如果要push到loginLightbox，他们将呈现为Lightbox，默认情况下将放置在当前场景的顶部，允许透明的背景。

```
<Router>
  <Lightbox>
    <Scene key="root">
      <Scene key="screen1" initial={true} component={Screen1} />
      <Scene key="screen2" component={Screen2} />
    </Scene>

    {/* Lightbox components will lay over the screen, allowing transparency*/}
    <Scene key="loginLightbox" component={loginLightbox} />
  </Lightbox>
</Router>

// 具体demo在App.js文件中 中文文档使用查看 https://www.jianshu.com/p/37428d579cf6

```

### 注意的问题
1、场景转换动画（默认是底部至顶部push），改变场景动画方法：

```
// 引用：
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';

<Modal
    key="modal"
    hideNavBar
    transitionConfig={() => ({screenInterpolator: CardStackStyleInterpolator.forHorizontal})}
  >
  ....
  </Modal>
  // 具体使用请看demo
```

## (二)、路由搭建完成后，如何高效管理 React Native 项目中的图片资源
如果直接引用地址，无论是更改图片资源名称还是更新图片都是比较麻烦的事情
1、在images文件夹中建立一个images.js文件存放图片资源
2、建立一个index.js文件导出该文件
3、引用图片资源

```
import ImageStore from '../images';
<Image source={ImageStore.guidePic.guidePic2} style={styles.imgs}/>

```

## (三)、React-Native配置自定义字体文件（安卓Android）

1. 首先下载自己想要的图标或则设计师自己设计的图标，转换成ttf格式字体
2. 在Android/app/src/main/assets/fonts/建立文件夹，并拷贝ttf文件字体进入
3. 重新编译项目，react-native run-android
4. 用法如下

```

<Text style={{ color: 'red', fontFamily:'iconfont',fontSize: 30 }}>&#xe666;</Text>
// 注意iconfont是字体文件名称可以自己定义 &#xe666;使用某个字体的unicode

```

## (四)、React-native(0.51.0) WebView组件乱码问题
```
      <WebView
        style={styles.webViewStyle}
        startInLoadingState={true}
        scalesPageToFit={true}
        source={{html: left_html + `${html_content}` + right_html, baseUrl: ''}}
      />
   // 添加 baseUrl: ''解决乱码（部分机型乱码）

```

##（五）、动画使用lottie-react-native第三方组件安装配置及出现的问题
Android版：

```
1、npm install lottie-react-native --save
2、react-native link lottie-react-native

```

#### 配置中出现的问题
Lottie需要Android支持库版本26.如果您正在使用该react-native init 模板，您可能仍然在使用23.要更改此设置，
只需转到该块内android/app/build.gradle的compileSdkVersion选项android并将其更改为

```
android {
    compileSdkVersion 26 // <-- update this to 26
    // ...
```

#### 实践中遇到的问题（安卓）
用react-native run-android 时报的错误

```
FAILURE: Build failed with an exception.

* What went wrong:
A problem occurred configuring project ':app'.
> Could not resolve all dependencies for configuration ':app:_debugApk'.
   > A problem occurred configuring project ':lottie-react-native'.
      > Could not resolve all dependencies for configuration ':lottie-react-native:_debugPublishCopy'.
         > Could not find com.android.support:appcompat-v7:26.1.0.
           Searched in the following locations:
               file:/Users/lihong/Library/Android/sdk/extras/android/m2repository/com/android/support/appcompat-v7/26.1.0/appcompat-v7-26.1.0.pom
               file:/Users/lihong/Library/Android/sdk/extras/android/m2repository/com/android/support/appcompat-v7/26.1.0/appcompat-v7-26.1.0.jar
               file:/Users/lihong/WebstormProjects/LottieExample/android/sdk-manager/com/android/support/appcompat-v7/26.1.0/appcompat-v7-26.1.0.jar
           Required by:
               LottieExample:lottie-react-native:unspecified > com.airbnb.android:lottie:2.3.1

* Try:
Run with --stacktrace option to get the stack trace. Run with --info or --debug option to get more log output.

BUILD FAILED

Total time: 20.289 secs
Could not install the app on the device, read the error above for details.
Make sure you have an Android emulator running or a device connected and have
set up your Android development environment:
https://facebook.github.io/react-native/docs/android-setup.html

```
#### 错误解决方法
1. ~app/build.gradle 文件中

```
android {
    compileSdkVersion 26  //更改为26
    buildToolsVersion "26.0.1"  //更改为26.0.1

    defaultConfig {
        applicationId "com.rn"
        minSdkVersion 16
        targetSdkVersion 26  // 更改为26
        versionCode 1
        versionName "1.0"
        vectorDrawables.useSupportLibrary = true
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }

...

dependencies {
    compile project(':lottie-react-native')
    compile project(':react-native-device-info')
    compile project(':react-native-image-crop-picker')
    compile fileTree(dir: "libs", include: ["*.jar"])
    compile "com.android.support:appcompat-v7:26.0.1" // 更改为26.0.1同上面android中一样版本
    compile "com.facebook.react:react-native:+"  // From node_modules
}
```

2. 如果还报错没有找到的之前的报错安装包解决方法（~android/build.gradle 文件中）

```
allprojects {
    repositories {
        mavenLocal()
        jcenter()
        maven { url 'https://maven.google.com' }  // 添加下载URL
        maven {
            // All of React Native (JS, Obj-C sources, Android binaries) is installed from npm
            url "$rootDir/../node_modules/react-native/android"
        }
    }
}

```

##### lottie-react-native 作图导出JSON需注意

```
 作图软件做好图片后，不要导出在该软件中导出PNG，直接拖入AE软件中，添加进动画效果中，否则JSON文件不能用，APP直接退出

```

## （六）、生命周期
    具体查看：https://www.jianshu.com/p/c21e0314beef
    #### React/React Native 的ES5 ES6写法对照表 http://bbs.reactnative.cn/topic/15/react-react-native-%E7%9A%84es5-es6%E5%86%99%E6%B3%95%E5%AF%B9%E7%85%A7%E8%A1%A8