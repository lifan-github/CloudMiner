import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  WebView,
  StyleSheet
} from 'react-native';
let left_html = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Title</title></head><body style="background-color: #fff; overflow-y: visible;">`;
let right_html = `<script>window.onload=function(){window.location.hash = 1;document.title = document.body.clientHeight;}</script></body></html>`;


export default class ProductTextDetails extends Component {
  render() {
    const {data} = this.props;
    let description = data.description;
    return (
      <View style={styles.container}>
        {
          description ?
            <WebView
              style={{flex: 1}}
              source={{html: left_html + `${description}` + right_html, baseUrl: ""}}
            />
            :
            <View style={[commonStyle.center, {flex: 1}]}>
              <Image style={styles.noProductImg} source={ImageStore.noStatusPic.noProducts}/>
              <Text style={styles.noText}>暂无商品详情</Text>
            </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  noProductImg: {
    width: 100,
    height: 100
  },
  noText: {
    fontSize: 14,
    color: "#999"
  }
});