import 'dart:convert';
import 'package:get_storage/get_storage.dart';

import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';

class Api {
  final box = GetStorage();

  var token;
  var decodeToken;

  // 10.0.2.2

  String Ip = '10.0.2.2:3200';

  Future<String> get() async {
    final url = Uri.http(Ip, '/user');
    final response = await http.get(url);
    return response.body;
  }

  Future<bool> login(String nip, String password) async {
    final url = Uri.http(Ip, '/login');
    final data = {'nip': nip, 'password': password};
    final json = jsonEncode(data);
    final response = await http
        .post(url, body: json, headers: {'Content-Type': 'application/json'});

    token = jsonDecode(response.body);

    decodeToken = JwtDecoder.decode(token['data']);

    box.write('Token', token['data']);
    box.write('decodeToken', decodeToken);

    return token['berhasil'];
  }

  Future<String> logout() async {
    final url = Uri.http(Ip, '/logout');

    var datas = box.read('decodeToken')["nip_user"];

    final data = {'nip': datas};

    final json = jsonEncode(data);

    final response = await http
        .delete(url, body: json, headers: {'Content-Type': 'application/json'});

    return response.body;
  }

  Future<String> checkin(String users_nip) async {
    final url = Uri.http(Ip, '/checkin');

    final data = {'users_nip': users_nip};

    final json = jsonEncode(data);

    final response = await http
        .post(url, body: json, headers: {'Content-Type': 'application/json'});

    final decode = jsonDecode(response.body);

    return decode['respons'];
  }

  Future<String> checkout(String users_nip) async {
    final url = Uri.http(Ip, '/checkout');

    final data = {'users_nip': users_nip};

    final json = jsonEncode(data);

    final response = await http
        .post(url, body: json, headers: {'Content-Type': 'application/json'});

    final decode = jsonDecode(response.body);

    return decode['respons'];
  }

  Future<bool> status() async {
    final url = Uri.http(Ip, '/status');

    var datas = box.read('decodeToken')["nip_user"];

    final data = {'users_nip': datas};

    final json = jsonEncode(data);
    // final accestoken = box.read('Token')['data'];
    final response = await http.post(url,
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': 'Bearer $accestoken ',
        },
        body: json);

    final decode = jsonDecode(response.body);

    return decode['payload'];
  }
}
