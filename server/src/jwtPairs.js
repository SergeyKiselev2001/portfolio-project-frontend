module.exports = {
  // Имитация выданных сервером токенов
  jwtPairs: [
    {
      user: 'Sergey',
      id: 1,
      tokens: {
        token:
          'eyJpdiI6InJUY2hXX050TDIzQm0tczUiLCJ0YWciOiJ5OVVfZUgxY1NnSjh3BJR0w4b0lRIiwidHlwIjoiSldUIiwiY3R5IjoiSldUIiwiYWxnIjoiQTI1NkdDTUtXIiwiZW5jIjoiQTI1NkdDTSIsImlzcyI6Imh0dHBzOi8vc3RhZ2UuYXBpLm15aXRjYXJlZXIuaW8vIiwiYXVkIjoiTXlJVGNhcmVlciIsImNyaXQiOlsiaXNzIiwiYXVkIiwiYWxnIiwiZW5jIl0sImtpZCI6IkNQTmlRZkZ5dC1YcWthTkVkeWZiOTVYYkNRaVFnTTVneEY1bldOTzdNOUkifQ.NkmQQq1P2JjcHcpumvGHzflejpOkaSpIXy6tWYpdEhg.SpFvK7A2sw50dAPv.FhHoAeeWxTejTkIONLQSjLSuQp1vMCljZJidyW68fdeOJCrVr3is1Gq66rQ28PSuZEJuMg401Lp8RWbHf_VMcSK2oWLeh2_b2-hFHgnv4ltfPGq5rbz4uYBFcIJu25uVprDYaoAV6gL60uCP_x7KgSV7v6ECKrcbpE6YT4rlxnJ2sNKFIT1F6tRTwymfZMaFp3Xy7TNSmFyVbQP_eGPmm4BJRDEqUV4VmUHujfDn_9AOb5UxM3RC-YGqFBV2FxiaXB5ydx7bqGlKQJf8H-Dxl6rcFU-KNKnWsrG_RokqS73NcKrOUhTrs165LJ1UOkIa_nw1Ilbg6xFmw-yeydhVtNI9qI9ozoyXRDjqtD3GCu97nUEH5l83sHamqAj0Kn6rk8uKQDKbYBnASektwwkZEQoie3ZNieEZtVdy9NatGkbdVvVDoAba04TG-CHBpq1oqDbTvcSD2KbG8fk15cuh724jcO7nGB91G1zhqIRjpAW7zYgOoUpxiKNXK0xQPFvY3HvD4yDCPC7aU-FhaHHs_qaocMdmkCyNSJEUTnz2gDBlqpXYHIvJ0jVtAffjAcXmzmKmk3weCUH2VrGoPgHWAIS0wHtqbYPbqOKbg8Uf_oEmmcgM4hoV4elM0sYZwl2T65-2bg_wT7oSBJYW06R-0TtNcImhZWXo3ZafNO4UCy9LuEep6vKTTxZwDzICjOGoje0T6STSWMg72xA-b_QB7KK1uBVOxj0LW8x7i0ATU4BmTWhLI5_9lOPE6nfs66J8_axtrgot.kQblgfZ18ikKBqdBUuSG1g',
        refresh_token:
          '64d36e03203eb93116a8cf6ea671eaa4fb35ca7b8f45fb55de1cdf989edec821fe5e36347957e7b711a7543495cb549f6d9a5bc396a0987be299cfb0a33ec5',
      },
    },
    {
      user: 'Vera_xxx',
      id: 23,
      tokens: {
        token:
          'py1JpdiI6InJUY2hXX050TDIzQm0tczUiLCJ0YWciOiJ5OVVfZUgxY1NnSjh3BJR0w4b0lRIiwidHlwIjoiSldUIiwiY3R5IjoiSldUIiwiYWxnIjoiQTI1NkdDTUtXIiwiZW5jIjoiQTI1NkdDTSIsImlzcyI6Imh0dHBzOi8vc3RhZ2UuYXBpLm15aXRjYXJlZXIuaW8vIiwiYXVkIjoiTXlJVGNhcmVlciIsImNyaXQiOlsiaXNzIiwiYXVkIiwiYWxnIiwiZW5jIl0sImtpZCI6IkNQTmlRZkZ5dC1YcWthTkVkeWZiOTVYYkNRaVFnTTVneEY1bldOTzdNOUkifQ.NkmQQq1P2JjcHcpumvGHzflejpOkaSpIXy6tWYpdEhg.SpFvK7A2sw50dAPv.FhHoAeeWxTejTkIONLQSjLSuQp1vMCljZJidyW68fdeOJCrVr3is1Gq66rQ28PSuZEJuMg401Lp8RWbHf_VMcSK2oWLeh2_b2-hFHgnv4ltfPGq5rbz4uYBFcIJu25uVprDYaoAV6gL60uCP_x7KgSV7v6ECKrcbpE6YT4rlxnJ2sNKFIT1F6tRTwymfZMaFp3Xy7TNSmFyVbQP_eGPmm4BJRDEqUV4VmUHujfDn_9AOb5UxM3RC-YGqFBV2FxiaXB5ydx7bqGlKQJf8H-Dxl6rcFU-KNKnWsrG_RokqS73NcKrOUhTrs165LJ1UOkIa_nw1Ilbg6xFmw-yeydhVtNI9qI9ozoyXRDjqtD3GCu97nUEH5l83sHamqAj0Kn6rk8uKQDKbYBnASektwwkZEQoie3ZNieEZtVdy9NatGkbdVvVDoAba04TG-CHBpq1oqDbTvcSD2KbG8fk15cuh724jcO7nGB91G1zhqIRjpAW7zYgOoUpxiKNXK0xQPFvY3HvD4yDCPC7aU-FhaHHs_qaocMdmkCyNSJEUTnz2gDBlqpXYHIvJ0jVtAffjAcXmzmKmk3weCUH2VrGoPgHWAIS0wHtqbYPbqOKbg8Uf_oEmmcgM4hoV4elM0sYZwl2T65-2bg_wT7oSBJYW06R-0TtNcImhZWXo3ZafNO4UCy9LuEep6vKTTxZwDzICjOGoje0T6STSWMg72xA-b_QB7KK1uBVOxj0LW8x7i0ATU4BmTWhLI5_9lOPE6nfs66J8_axtrgot.kQblgfZ18ikKBqdBUuSG1g',
        refresh_token:
          '542d36e03203eb93116a8cf6ea671eaa4fb35ca7b8f45fb55de1cdf989edec821fe5e36347957e7b711a7543495cb549f6d9a5bc396a0987be299cfb0a33ec5',
      },
    },
    {
      user: 'Volibear',
      id: 99,
      tokens: {
        token:
          'x91JpdiI6InJUY2hXX050TDIzQm0tczUiLCJ0YWciOiJ5OVVfZUgxY1NnSjh3BJR0w4b0lRIiwidHlwIjoiSldUIiwiY3R5IjoiSldUIiwiYWxnIjoiQTI1NkdDTUtXIiwiZW5jIjoiQTI1NkdDTSIsImlzcyI6Imh0dHBzOi8vc3RhZ2UuYXBpLm15aXRjYXJlZXIuaW8vIiwiYXVkIjoiTXlJVGNhcmVlciIsImNyaXQiOlsiaXNzIiwiYXVkIiwiYWxnIiwiZW5jIl0sImtpZCI6IkNQTmlRZkZ5dC1YcWthTkVkeWZiOTVYYkNRaVFnTTVneEY1bldOTzdNOUkifQ.NkmQQq1P2JjcHcpumvGHzflejpOkaSpIXy6tWYpdEhg.SpFvK7A2sw50dAPv.FhHoAeeWxTejTkIONLQSjLSuQp1vMCljZJidyW68fdeOJCrVr3is1Gq66rQ28PSuZEJuMg401Lp8RWbHf_VMcSK2oWLeh2_b2-hFHgnv4ltfPGq5rbz4uYBFcIJu25uVprDYaoAV6gL60uCP_x7KgSV7v6ECKrcbpE6YT4rlxnJ2sNKFIT1F6tRTwymfZMaFp3Xy7TNSmFyVbQP_eGPmm4BJRDEqUV4VmUHujfDn_9AOb5UxM3RC-YGqFBV2FxiaXB5ydx7bqGlKQJf8H-Dxl6rcFU-KNKnWsrG_RokqS73NcKrOUhTrs165LJ1UOkIa_nw1Ilbg6xFmw-yeydhVtNI9qI9ozoyXRDjqtD3GCu97nUEH5l83sHamqAj0Kn6rk8uKQDKbYBnASektwwkZEQoie3ZNieEZtVdy9NatGkbdVvVDoAba04TG-CHBpq1oqDbTvcSD2KbG8fk15cuh724jcO7nGB91G1zhqIRjpAW7zYgOoUpxiKNXK0xQPFvY3HvD4yDCPC7aU-FhaHHs_qaocMdmkCyNSJEUTnz2gDBlqpXYHIvJ0jVtAffjAcXmzmKmk3weCUH2VrGoPgHWAIS0wHtqbYPbqOKbg8Uf_oEmmcgM4hoV4elM0sYZwl2T65-2bg_wT7oSBJYW06R-0TtNcImhZWXo3ZafNO4UCy9LuEep6vKTTxZwDzICjOGoje0T6STSWMg72xA-b_QB7KK1uBVOxj0LW8x7i0ATU4BmTWhLI5_9lOPE6nfs66J8_axtrgot.kQblgfZ18ikKBqdBUuSG1g',
        refresh_token:
          'ps2d36e03203eb93116a8cf6ea671eaa4fb35ca7b8f45fb55de1cdf989edec821fe5e36347957e7b711a7543495cb549f6d9a5bc396a0987be299cfb0a33ec5',
      },
    },
  ],
}
