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
import {ImageStore} from '../images/index';
<Image source={ImageStore.guidePic.guidePic2} style={styles.imgs}/>

```