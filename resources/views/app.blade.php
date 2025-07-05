<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Hello</title>
    <link href="{{ App\Http\Helper\Utility::loadAsset('assets/css/style.css') }}" rel="stylesheet">
    <link href="{{ App\Http\Helper\Utility::loadAsset('assets/vendor/bootstrap-icons/bootstrap-icons.css') }}" rel="stylesheet">
    <link href="{{ App\Http\Helper\Utility::loadAsset('assets/vendor/bootstrap/css/bootstrap.min.css') }}" rel="stylesheet">
    <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.7.1/css/bootstrap-datepicker.css" /> -->

    <style>
      .react-datepicker-wrapper{
        width: 100% !important;
      }
    </style>
    @viteReactRefresh
    @vite(['resources/css/app.css','resources/js/app.jsx'])
</head>
<body>
  @inertia
</body>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
  defer
></script>
</html>