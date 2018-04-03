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
import {dayGains} from "../../utils/Config";


export default class ProductFlatListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: true
    };
  }

  _renderListItems(item) {
    /*const {block_diff, blockSubsidy} = this.state;
    let day_earnings, productImage;

    if (item.salesMethod && item.salesMethod === "byEquipment") {
      day_earnings = dayGains(item.equipment.hashRate, block_diff, blockSubsidy);
      day_earnings = (day_earnings * (1 - item.serviceFeePercent / 1000)).toFixed(8);
    } else {
      day_earnings = dayGains(item.salesUnit, block_diff, blockSubsidy);
      day_earnings = (day_earnings * (1 - item.serviceFeePercent / 1000)).toFixed(8);
    }

    if (item.coverPhoto.url) {
      productImage = {uri: item.coverPhoto.url}
    } else {
      productImage = theImg.gi('defaultGood')
    }*/

    return (
      <TouchableNativeFeedback
        // onPress={() => Actions.toDetailVia({productId: item.Id})}
        background={TouchableNativeFeedback.SelectableBackground()}
      >
       {/* <View style={[styles.itemViewStyle, commom.between, commom.viewBgColor255]}>
          <View style={[commom.flex1, styles.listContent]}>
            <View style={[commom.alignItemStyle, commom.row]}>
              <Text numberOfLines={1} style={[commom.font16, commom.fontColor333, styles.productNameText]}>
                {item.name}
              </Text>
              <View style={{alignItems: 'flex-end'}}>
                <View style={[styles.productStateView, commom.center, {backgroundColor: item.statusBgColor}]}>
                  <Text style={[styles.productStateText, {color: item.statusColor}]}>
                    {item.productStatus}
                  </Text>
                </View>
              </View>
            </View>
            <View style={[styles.itemProductSpeedView, commom.row]}>
              <View style={[styles.flexColumnStyle, {flex: 2}]}>
                <View style={commom.row}>
                  <Text style={styles.speedColor}>
                    <Text style={[commom.IconFontFamily, commom.font12]}>{theIco.gi('icon-RMB')}</Text>{item.price}
                  </Text>
                </View>
                <View>
                  <Text style={[commom.font12, commom.fontColor999]}>{item.salesMethodText}</Text>
                </View>
              </View>
              <View style={[styles.flexColumnStyle, {flex: 3, alignItems: 'flex-start', marginLeft: 10}]}>
                <View style={[commom.row]}>
                  <Text style={styles.speedColor}>{day_earnings}</Text>
                  <Text style={styles.speedUnitColor}>BTC</Text>
                </View>
                <Text style={[commom.font12, commom.fontColor999]}>预计每日收益</Text>
              </View>
            </View>
          </View>
          <View style={[styles.itemImgView]}>
            <Image source={productImage} style={styles.itemImg}/>
          </View>
        </View>*/}
      </TouchableNativeFeedback>
    )
  }

  _listEmptyComponent() {
    return (
      <View style={[commonStyle.center, styles.noProductsContent]}>
        <Image style={styles.noProductDetails} source={ImageStore.noStatusPic.noProducts}/>
        <Text style={{color: "#999"}}>暂无商品出售</Text>
      </View>
    );
  }

  _itemSeparatorComponent() {
    return <View style={{height: 2, backgroundColor: '#f5f5f5'}}/>;
  }

  listHeaderComponent() {
    return <View style={{height: 10, backgroundColor: '#f5f5f5'}}/>;
  }

  render() {
    const {productData, onHandleRefresh} = this.props;
    return (
      <FlatList
        style={styles.flatListStyle}
        data={[]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => this._renderListItems(item)}
        ListEmptyComponent={() => this._listEmptyComponent()}
        ItemSeparatorComponent={() => this._itemSeparatorComponent()}
        ListHeaderComponent={() => this.listHeaderComponent()}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={onHandleRefresh}
            colors={['#fff']}
            progressBackgroundColor={"#9b9b9b"}
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
    marginBottom: 8
  },
  listContent: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  productNameText: {
    flex: 2
  },
  productStateView: {
    height: 17,
    width: 53
  },
  productStateText: {
    fontSize: 11
  },
  itemProductSpeedView: {
    marginTop: 15
  },
  speedColor: {
    color: "#F5A623",
    fontSize: 14
  },
  speedUnitColor: {
    color: "#F5A623",
    fontSize: 12,
    alignSelf: 'flex-end',
    left: 3
  },
  flexColumnStyle: {
    flexDirection: 'column'
  },
  itemImgView: {
    width: 110
  },
  itemImg: {
    height: 110,
    width: 110
  }
});
