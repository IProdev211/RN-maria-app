package jp.cyclone.maria;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.security.KeyFactory;
import java.security.PublicKey;
import java.security.spec.X509EncodedKeySpec;
import java.util.HashMap;
import java.util.Map;
import javax.crypto.Cipher;
import org.json.JSONObject;
import android.util.Base64;

public class MakeEncryptedCardInfoModule extends ReactContextBaseJavaModule {
    MakeEncryptedCardInfoModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "MakeEncryptedCardInfoModule";
    }

    // PG の公開鍵
    private static final String PG_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA1ezWxDkJLvN6HTqSqAPPaNUgWd2cKDDuSfQ90XHp7gv6rEiWwuXm6ZnrG3GzaOFgYSrIhRfE9IT5GeXGhdFP9wbKOsCo1MAFxCqey67eRK6yp1gTC/GNUzS660PKmRtXTOT8Gmv9Hxu1YFzRFWJI/gY4ZuKeJ2DGWCGDJZdS16TpD9PcZo2uRSDTfgPLKBPqiigi3JHbsT5Fnvf9rRoFaCH+aIhE23L1F5hySgjBhX0F0PN7nNGkPJAnOOjMfaKm8giGllzHKLirjoFq+aDJqCMfJkj1rdhE0+SsIQW15vhOHv1C7s2Ioik/ABG/UNRsd6w0tFtNa2VQg37m9qJZMwIDAQAB";

    //
    // Encrypted 作成手順例
    // (例外処理については別途考慮してください)
    //
    @ReactMethod
    public void makeEncryptedCardInfo(String cardNo, String expire, String securityCode, String holderName, Promise promise) {
        try {
            // カード情報 JSON データ作成
            Map<String, String> map = new HashMap<>();
            map.put("cardNo", cardNo); // カード番号
            map.put("expire", expire); // カードの有効期限
            map.put("securityCode", securityCode); // セキュリティ コード(任意項目)
            map.put("holderName", holderName); // カード名義人(任意項目)
            map.put("tokenNumber", "1"); // トークンを発行する数

            String cardInfoJson = new JSONObject(map).toString();

            // PG マルチペイメントサービスから提供された公開鍵から公開鍵オブジェクト作成
            byte[] buffer = Base64.decode(PG_PUBLIC_KEY.getBytes(), Base64.DEFAULT);
            X509EncodedKeySpec keySpec = new X509EncodedKeySpec(buffer);
            KeyFactory keyFactory = KeyFactory.getInstance("RSA");
            PublicKey publicKey = keyFactory.generatePublic(keySpec);
            // カード情報 JSON データを暗号化
            Cipher cipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
            cipher.init(Cipher.ENCRYPT_MODE, publicKey);
            byte[] encryptedByte = cipher.doFinal(cardInfoJson.getBytes());

            // Base64 エンコード処理
            String encryptedCardInfo = Base64.encodeToString(encryptedByte, Base64.DEFAULT);

            promise.resolve(encryptedCardInfo);
        } catch (Exception e) {
            promise.reject("Create Encrypt Error", e);
        }
    }
}
