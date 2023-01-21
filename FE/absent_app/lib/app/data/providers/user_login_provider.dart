import 'dart:convert';

import 'package:get/get.dart';
import 'package:get_storage/get_storage.dart';
import 'package:http/http.dart' as http;

class UserLoginProvider extends GetConnect {
  Future<bool> login(String nip, String password) async {
    final response =
        await http.post(Uri.http("10.0.2.2:3200", "/login"), body: {
      'nip': nip,
      'password': password,
    });

    print(response.body);

    final box = GetStorage();

    var data = json.decode(response.body);

    box.write('dataUser', data);
    // box.erase();
    print(box.read('dataUser'));

    print(data);
    print(data['berhasil']);

    return data['berhasil'];
  }

  Future<bool> absen(String id, String checkin) async {
    final response =
        await http.post(Uri.http("10.0.2.2:5001", "/api/presents"), body: {
      "user_id": id,
      "is_checkin": checkin,
    });

    var data = jsonDecode(response.body);
    print(data);

    return true;
  }

  Future<String> status(String id) async {
    final response =
        await http.post(Uri.http("10.0.2.2:5001", "/api/status"), body: {
      "user_id": id,
    });

    var data = jsonDecode(response.body);
    print('data');

    return data['action'];
  }

  // Future<String> status(String users_nip) async {
  //   final data = {'users_nip': users_nip};

  //   // final json = jsonEncode(data);

  //   final url = Uri.http('192.168.88.212:3200', '/status');

  //   final response = await http.get(url, headers: data);
  //   final decode = jsonDecode(response.body);
  //   print(decode);

  //   return decode['status'];
  // }
}
