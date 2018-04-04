import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableNativeFeedback
} from 'react-native';
import {dayGains} from '../../utils/Config';

export default class ProductFlatListComponent extends Component {
  renderListItems(item) {
    let day_earnings, productImage;
    const {currentDiff, currBlockSubsidy} = this.props;
    // 收益换算
    if (item.salesMethod && item.salesMethod === "byEquipment") {
      day_earnings = dayGains(item.equipment.hashRate, currentDiff, currBlockSubsidy);
      day_earnings = (day_earnings * (1 - item.serviceFeePercent / 1000)).toFixed(8);
    }else{
      day_earnings = dayGains(item.salesUnit, currentDiff, currBlockSubsidy);
      day_earnings = (day_earnings * (1 - item.serviceFeePercent / 1000)).toFixed(8);
    }
    // 商品图片
    if (item.coverPhoto.url) {
      productImage = {uri: item.coverPhoto.url}
    } else {
      productImage = ImageStore.noStatusPic.noProducts;
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}
        onPress={() => Actions.toDetailVia({productId: item.Id})}
      >
        <View style={[styles.itemViewStyle, commonStyle.between]}>
          <View style={{flex: 1}}>
            <View style={styles.nameStatus}>
              <Text numberOfLines={1} style={styles.proName}>{item.name}</Text>
              <View style={{flex: 1}}>
                <Text style={[styles.productStateText, {color: item.statusColor, backgroundColor: item.statusBgColor}]}>已售罄</Text>
              </View>
            </View>
            <View style={styles.productIncome}>
              <View style={{flex: 1}}>
                <Text style={styles.proPrice}>{IconStore.rmb}{item.price}</Text>
                <Text style={styles.incomeText}>{item.salesMethodText}</Text>
              </View>
              <View style={{flex: 1}}>
                <Text style={styles.proPrice}>{IconStore.btc}{day_earnings}</Text>
                <Text style={styles.incomeText}>预计每日收益</Text>
              </View>
            </View>
          </View>
          <Image style={styles.itemImg} source={productImage}/>
        </View>
      </TouchableNativeFeedback>
    )
  }

  // 没有数据显示
  listEmptyComponent() {
    return (
      <View style={[commonStyle.center, styles.noProductsContent]}>
        <Image style={styles.noProductDetails} source={ImageStore.noStatusPic.noProducts}/>
        <Text style={{color: "#999"}}>暂无商品出售</Text>
      </View>
    );
  }

  // 顶部header
  listHeaderComponent() {
    return <View style={{height: 10, backgroundColor: '#f5f5f5'}}/>;
  }

  render() {
    return (
      <FlatList
        style={styles.flatListStyle}
        data={this.props.productData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => this.renderListItems(item)}
        ListEmptyComponent={() => this.listEmptyComponent()}
        ListHeaderComponent={() => this.listHeaderComponent()}
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={this.props.onHandleRefresh}
            colors={['#fff']}
            progressBackgroundColor={"#B9B9B9"}
          />
        }
      />
    )
  }
}

const styles = StyleSheet.create({
  noProductDetails: {
    width: 100,
    height: 100
  },
  noProductsContent: {
    height: SCREEN_HEIGHT - 135
  },
  /**
   * listItemstyle
   */
  flatListStyle: {
    flex: 1
  },
  itemViewStyle: {
    height: 110,
    paddingLeft: 10,
    paddingRight: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 1
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderRadius: 4,
    marginHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "#fff"
  },
  itemImg: {
    height: 110,
    width: 110
  },
  nameStatus: {
    flexDirection: 'row',
  },
  productIncome: {
    flexDirection: 'row',
    marginTop: 20
  },
  proName: {
    flex: 1,
    fontSize: 16,
    color: "#333"
  },
  productStateText: {
    width: 40,
    height: 24,
    lineHeight: 24,
    fontSize: 12,
    textAlign: 'center'
  },
  proPrice: {
    fontSize: 14,
    color: "#F5A623"
  },
  incomeText: {
    fontSize: 14,
    color: "#999"
  }
});
