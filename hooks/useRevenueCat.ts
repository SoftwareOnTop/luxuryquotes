import { useEffect, useState } from 'react';
import { Platform, Alert } from 'react-native';
import Purchases, { PurchasesOffering, PurchasesPackage } from 'react-native-purchases';
import { useAuth } from '../context/AuthContext';

// Instructions:
// 1. Create a RevenueCat account.
// 2. Create a new App in RevenueCat.
// 3. Get the Public API Keys (one for iOS, one for Android).
// 4. Configure "Entitlements" (e.g., "patron") and "Offerings" (e.g., "default").

const APIKeys = {
  apple: "YOUR_APPLE_API_KEY",
  google: "YOUR_GOOGLE_API_KEY",
};

export function useRevenueCat() {
  const { user, userProfile } = useAuth();
  const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (Platform.OS === 'ios') {
        Purchases.configure({ apiKey: APIKeys.apple });
      } else if (Platform.OS === 'android') {
        Purchases.configure({ apiKey: APIKeys.google });
      }

      if (user?.uid) {
        await Purchases.logIn(user.uid);
      }

      try {
        const offerings = await Purchases.getOfferings();
        if (offerings.current !== null) {
          setCurrentOffering(offerings.current);
        }

        const customerInfo = await Purchases.getCustomerInfo();
        if (typeof customerInfo.entitlements.active['patron'] !== "undefined") {
          setIsPro(true);
        }
      } catch (e) {
        console.log("RevenueCat error:", e);
      }
    };

    init();
  }, [user]);

  const purchasePackage = async (pack: PurchasesPackage) => {
    try {
      const { customerInfo } = await Purchases.purchasePackage(pack);
      if (typeof customerInfo.entitlements.active['patron'] !== "undefined") {
        setIsPro(true);
        return true;
      }
    } catch (e: any) {
      if (!e.userCancelled) {
        Alert.alert("Error", e.message);
      }
    }
    return false;
  };

  const restorePurchases = async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      if (typeof customerInfo.entitlements.active['patron'] !== "undefined") {
        setIsPro(true);
        Alert.alert("Success", "Purchases restored!");
      } else {
        Alert.alert("Info", "No active subscriptions found.");
      }
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  return { currentOffering, isPro, purchasePackage, restorePurchases };
}
