import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  RefreshControl,
  TouchableOpacity
} from 'react-native';
import {connect} from "react-redux";
import {formatDateDay} from '../../../utils/Config';
import {getNotice} from "../../../redux/actions/HomeActions";

class Notice extends Component {
  renderItem(item) {
    let title = item.title.length > 10 ? item.title.substring(0, 10) + "..." : item.title;
    let publishedAt = formatDateDay(item.publishedAt);
    return (
      <TouchableOpacity
        style={[commonStyle.between, styles.itemBox]}
        activeOpacity={0.8}
        onPress={() => Actions.noticeDetailHome({details: item})}
      >
        <View style={[commonStyle.flex1, commonStyle.between]}>
          <Text numberOfLines={1}>{title}</Text>
          <Text>{publishedAt}</Text>
        </View>
        <Text style={styles.arrowIcon}>{IconStore.arrowright}</Text>
      </TouchableOpacity>
    )
  }

  renderSeparator() {
    return (
      <View style={styles.separator}/>
    )
  }

  renderEmptyComponent() {
    return (
      <View style={styles.emptyBox}>
        <Image
          style={styles.noDataImg}
          source={ImageStore.noStatusPic.noNotices}
        />
        <Text style={styles.tipsText}>暂无公告</Text>
      </View>
    )
  }

  bindRefresh(){
    this.props.dispatch(getNotice({status: ["published"]}));
  }

  render() {
    const {notices, isRefreshing} = this.props.homeReducer;
    return (
      <View style={styles.container}>
        <FlatList
          data={notices}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item}) => this.renderItem(item)}
          ItemSeparatorComponent={() => this.renderSeparator()}
          ListEmptyComponent={() => this.renderEmptyComponent()}
          refreshControl={
            <RefreshControl
              refreshing={isRefreshing}
              onRefresh={() => this.bindRefresh()}
              colors={['#fff']}
              progressBackgroundColor={"#B9B9B9"}
            />
          }
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  itemBox: {
    height: 55,
    paddingHorizontal: 16,
    backgroundColor: "#fff"
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#ddd"
  },
  arrowIcon: {
    fontSize: 20,
    marginLeft: 5
  },
  emptyBox: {
    height: SCREEN_HEIGHT - 80,
    alignItems: "center",
    justifyContent: "center"
  },
  noDataImg: {
    width: 100,
    height: 100
  },
  tipsText: {
    fontSize: 16,
    color: "#999"
  }
});

function select(state) {
  return {
    homeReducer: state.HomeReducer
  }
}

export default connect(select)(Notice);