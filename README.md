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