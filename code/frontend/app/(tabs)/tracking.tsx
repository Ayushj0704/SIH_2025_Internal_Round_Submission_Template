import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function ShopScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header content moved to _layout.tsx */}
        <ScrollView contentContainerStyle={styles.main}>
          <Text style={styles.featuredTitle}>Featured Products</Text>
          <View style={styles.productList}>
            {/* Product Card 1 */}
            <View style={styles.productCard}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6u3hc6DTICDT5NzuOT31aKGUSxts_Ag4jFW7wTL5uyZRrlPuJRcTCIEw6rFIznmp7Wguv2_OMamQOY1QBOjSqZxdBeFtQ6vp7WtwIQi19nUhxMkpA74NIdMtg6s6kf1jE5Hz73Hlyy5lMMiYrRlTgyv1-by-oWiR_xTJtJ9hQ36Hq0OHkLi7s5_CRJEslsKjA_GA5rxfGjU1IExnktzca7XOnOg4OW-jxzAmGDsguABawYJHyNvfBgKne0Gb-xwCcD6Ol3NzNMUr9' }}
                style={styles.productImage}
                imageStyle={styles.productImageStyle}
              />
              <View style={styles.productInfo}>
                <View style={styles.productTextContent}>
                  <Text style={styles.productTag}>Eco-Friendly</Text>
                  <Text style={styles.productName}>Bamboo Toothbrush</Text>
                  <Text style={styles.productDescription}>Sustainable and biodegradable.</Text>
                  <Text style={styles.productPrice}>₹45</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton}>
                  <MaterialIcons name="add-shopping-cart" size={24} color="#fff" style={styles.cartIcon} />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Product Card 2 */}
            <View style={styles.productCard}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAvQRUgih6e3KLgfwXPtubevy8e4-Bpb8G_oVftee720XP0N9spQWGUFVCksf7dcqbev8sEs9ahpTNic42TP_ge2mRgW5G2zlRiWDvdohBCYoZGcTyIvaDYLCZHgjsB2BKlmc1Ek9mbOL1F6stdT4QpKI8M7hIqz6XfJeGuO6CdFU9cqFTdavL22MLHOtszf5bc8CDGDNNhkqVUxUHEpJxBkjwB3NQyOR_m2NI-5KWCN4JE8fpPaL9tp_fr8kS0DFvappfHDm6Xzx8B' }}
                style={styles.productImage}
                imageStyle={styles.productImageStyle}
              />
              <View style={styles.productInfo}>
                <View style={styles.productTextContent}>
                  <Text style={styles.productTag}>Recycled</Text>
                  <Text style={styles.productName}>Reusable Water Bottle</Text>
                  <Text style={styles.productDescription}>Made from recycled materials.</Text>
                  <Text style={styles.productPrice}>₹99</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton}>
                  <MaterialIcons name="add-shopping-cart" size={24} color="#fff" style={styles.cartIcon} />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
            {/* Product Card 3 */}
            <View style={styles.productCard}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBS7qC_5Gcuzj6qMa1X1XmEW7FQAjr5KBrN7n1U06fFpshZ1GpWQVlBDuUj84O2BoemaKWmTsVaKmZMm5HDdmemBRfG6tExdgRMFqYuw4KCyAaiIy-FHCs6DmJXtsZKQ3RUZWIuHJqYvG1GFPF-DlHM0h-HVqimTOn60XdcDpbtKeFzcoJtK9SQRds0aNg8jIHfkKfP7nncx0Wi1dUIG3Utv3NxyG5I6nWTaLTLvaa43i57ed6ZnR2MKwWoRAajpUe4UvuUS9yKI7wX' }}
                style={styles.productImage}
                imageStyle={styles.productImageStyle}
              />
              <View style={styles.productInfo}>
                <View style={styles.productTextContent}>
                  <Text style={styles.productTag}>Organic</Text>
                  <Text style={styles.productName}>Organic Cotton Tote Bag</Text>
                  <Text style={styles.productDescription}>Durable and eco-friendly.</Text>
                  <Text style={styles.productPrice}>₹129</Text>
                </View>
                <TouchableOpacity style={styles.addToCartButton}>
                  <MaterialIcons name="add-shopping-cart" size={24} color="#fff" style={styles.cartIcon} />
                  <Text style={styles.addToCartText}>Add to Cart</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { flex: 1, backgroundColor: '#fff' },
  main: { paddingVertical: 24, paddingHorizontal: 16, backgroundColor: '#f5f5f5' }, // Increased paddingTop and paddingBottom
  featuredTitle: { fontSize: 20, fontWeight: '700', color: '#212121', marginBottom: 24 },
  productList: { gap: 24 },
  productCard: {
    backgroundColor: '#f2fbf2',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  productImage: { height: 192, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' },
  productImageStyle: { resizeMode: 'cover' },
  productInfo: { padding: 16, flexDirection: 'column', justifyContent: 'space-between', flexGrow: 1 },
  productTextContent: { flexGrow: 1 },
  productTag: { fontSize: 14, fontWeight: '500', color: '#388E3C' },
  productName: { fontSize: 18, fontWeight: '700', color: '#212121', marginTop: 4 },
  productDescription: { fontSize: 14, color: '#424242', marginTop: 4 },
  productPrice: { fontSize: 18, fontWeight: '700', color: '#388E3C', marginTop: 8 },
  addToCartButton: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 48, backgroundColor: '#4CAF50', borderRadius: 12, paddingHorizontal: 24 },
  cartIcon: { marginRight: 8 },
  addToCartText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});