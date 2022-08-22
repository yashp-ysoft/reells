import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Image,
  FlatList,
  StyleSheet,
  Dimensions,
  ToastAndroid,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Button,
  Text
} from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
import RBSheet from 'react-native-raw-bottom-sheet';




const screenHeight = Dimensions.get('window').height;
const screenWidth = Dimensions.get('window').width;

let endReached = false;
const IMAGE = [
  {
    id: 1,
    url: 'data:image/jpeg;base64,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',
  },
  {
    id: 2,
    url: 'data:image/jpeg;base64,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',
  },
  {
    id: 3,
    url: 'data:image/jpeg;base64,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',
  },
  {
    id: 4,
    url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo2BJIXcYPra20y3wjiyWvWGZ4AVZms9MbPA&usqp=CAU',
  },
];

const App = () => {
  const [like, setLike] = useState(1);
  const [comm, setComm] = useState(1);
  const [page, setPage] = useState(1);
  const [DATA, setData] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const cartsheet = useRef(null);

  useEffect(() => {
    getApiData();
  }, []);

  const getApiData = async page => {
    await axios({
      method: 'get',
      url:
        'https://stg.starzly.io/api/featured-videos?page=' +
        page +
        '%E2%A6%81&%E2%A6%81per_page=2%E2%A6%81&%E2%A6%81app=1%E2%A6%81&%E2%A6%81new=1',
    })
      .then(function (response) {
        if (response) {
          setData(response.data);
        } else {
        }
      })
      .catch(function (error) {});
  };

  const onProgress = data => {
    if (!isLoading) {
    }
  };

  const onLoad = data => {
    setIsLoading(false);
  };

  const onLoadStart = () => {
    setIsLoading(true);
  };

  const loadMoreData = async page => {
    await axios({
      method: 'get',
      url:
        'https://stg.starzly.io/api/featured-videos?page=' +
        page +
        '%E2%A6%81&%E2%A6%81per_page=2%E2%A6%81&%E2%A6%81app=1%E2%A6%81&%E2%A6%81new=1',
    })
      .then(function (response) {
        endReached = false;
        console.log(response?.data, endReached);
        if (response) {
          setData([...DATA, response.data]);
        } else {
        }
      })
      .catch(function (error) {});
  };
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contetentSize,
  }) => {
    const paddingToBottom = 30;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contetentSize.height - paddingToBottom
    );
  };

  return (
    <View style={styles.container}>
      {/* {console.log(DATA,"datttatata")} */}

      {DATA && DATA?.length > 0 ? (
        <ScrollView
          pagingEnabled
          bounces={false}
          scrollEventThrottle={16}
          removeClippedSubviews={true}
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}
          onMomentumScrollEnd={e => {
            const index = Math.round(
              e.nativeEvent.contentOffset.y / screenHeight,
            );

            if (DATA?.length - index <= 2) {
              loadMoreData(page + 1);
            }
          }}
          onScrollEndDrag={({nativeEvent}) => {
            setPaused(false);
            // if (isCloseToBottom(nativeEvent)) {
            // }
          }}>
          {DATA?.map((item, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={1.0}
              // onPress={onItempress}
              style={{height: screenHeight}}>
              {isLoading ? (
                <ActivityIndicator
                  animating
                  size={'large'}
                  color={'gray'}
                  style={{
                    position: 'absolute',
                    top: screenHeight / 2,
                    right: screenWidth / 2 - 15,
                  }}
                />
              ) : null}
              {console.log(DATA, 'datttatata')}

              <Video
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                paused={paused}
                resizeMode="none"
                source={{uri: item.url}}
                repeat
                style={styles.mediaPlayer}
              />
               <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  right: 40,
left:300,
                  bottom: 350,
                  // backgroundColor: 'red',
                  // backgroundColor: 'red',
                }}
                onPress={() => {
                  setLike(like+1);
                }}>
                   <Image
                source={require('./like.png')}
                style={{height: 50, width:50,borderRadius:25,backgroundColor:"#fff"}}
              />
              <Text style={{alignSelf:"center",color:"#fff"}
              }>{like}</Text>
                </TouchableOpacity>
               <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  right: 40,
left:300,
                  bottom: 250,
                  // backgroundColor: 'red',
                  // backgroundColor: 'red',
                }}
                onPress={() => {
                  setComm(comm+1);
                }}>
                   <Image
                source={require('./message.png')}
                style={{height: 50, width:50,borderRadius:25,backgroundColor:"#fff"}}
              />
              <Text style={{alignSelf:"center",color:"#fff"}
              }>{comm}</Text>
                </TouchableOpacity>
 {/* <TouchableOpacity
                style={{
                  height: 20,
                  width: 30,
                  position: 'absolute',
                  right: 60,

                  bottom: 45,
                  backgroundColor: 'red',
                }}
                onPress={() => {
                  cartsheet.current.open();
                }}>
                   <Image
                source={require('./like.png')}
                style={{height: 200, width:screenWidth}}
              />
                </TouchableOpacity> */}
              <TouchableOpacity
                style={{
                  height: 30,
                  width: 30,
                  position: 'absolute',
                  right: 40,
left:160,
                  bottom: 80,
                  // backgroundColor: 'red',
                }}
                onPress={() => {
                  cartsheet.current.open();
                }}>
                   <Image
                source={require('./cart.jpg')}
                style={{height: 50, width:50, borderRadius:25                }}
              />
                </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : null}

      <RBSheet
        ref={cartsheet}
        height={(screenHeight + 350) / 2}
        openDuration={250}
        closeOnDragDown={true}
        customStyles={{
          container: {
            padding: 10,
            paddingHorizontal: 10,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },

          draggableIcon: {
            width: 60,
            backgroundColor: 'gray',
          },
        }}>
          <TouchableOpacity   style={{flex:1}}>
        <FlatList
        pagingEnabled
          showsVerticalScrollIndicator={false}
          data={IMAGE}
          horizontal={true}
          style={{flex:1}}
          renderItem={({item, index}) => {
            return (
              <Image
                source={{uri: item.url}}
                style={{height: 200, width:screenWidth}}
              />
             );
          }}
        />
        <View style={{flexDirection:"row",height:30,marginVertical:10}}>
         <Text style={{color:"gray"}}>Top Notes : Bergamot ,Grape Fruit,Apple</Text>
         <TouchableOpacity style={{height:30,width:60,marginHorizontal:30,backgroundColor:"pink",justifyContent:"center",borderRadius:10}}><Text>exclusive</Text></TouchableOpacity>
         </View>
         <View style={{flexDirection:"row",height:30,alignItems:"center"}}>
         <Text style={{fontSize:20}}>
         Royalty Eau de Parfum-100 ml 
         </Text>
         <Text style={{fontSize:20,marginHorizontal:20}}>
         99$
         </Text>
         </View>
<View style={{flexDirection:"row",height:30,marginVertical:5,alignItems:"center"}}>
<Image
                source={{uri: "data:image/jpeg;base64,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"}}
                style={{height: 35, width:35, borderRadius:20,backgroundColor:"black",marginHorizontal:10}}
              />
         <Text>by Maged el Masry Actors Egypt </Text>
         <Image
                source={{uri: "data:image/jpeg;base64,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"}}
                style={{height: 40, width:80,backgroundColor:"black",marginHorizontal:5}}
              />
         </View>
         <Text style={{fontSize:20}}>Discription</Text>
         <Text style={{marginVertical:10}}>A perfume that captures hearts Detaied as a piece of arts 
Alters your mood and reality
Feeling speack of its sensuality ..seemore</Text>

        </TouchableOpacity>
        <View style={{flexDirection:"row"}}
        >
        <TouchableOpacity style={{height:60,width:122,marginHorizontal:30,backgroundColor:"gray",justifyContent:"center",borderRadius:10,alignItems:"center",flexDirection:'row'}}>
        <Image
                source={{uri: "data:image/png;base64,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"}}
                style={{height: 40, width:40, borderRadius:20,backgroundColor:"black",marginHorizontal:5}}
              />
          <Text>ADD VIDEO REVIEW</Text></TouchableOpacity>
        <TouchableOpacity style={{height:60,width:130,marginHorizontal:30,backgroundColor:"pink",justifyContent:"center",borderRadius:10,alignItems:"center",flexDirection:"row"}}><Image
                source={require('./cart.jpg')}
                style={{height: 30, width:30, borderRadius:15,backgroundColor:'pink'}}
              /><Text> ADD TO CART</Text></TouchableOpacity>
        </View>
      </RBSheet>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 

  },

  mediaPlayer: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // height: screenHeight,
    // width: screenWidth,
    position: 'absolute',
  },
});
export default App;
