package com.example.backend.jwt;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.Serializable;

/**
 * 인증되지 않았을 경우(비로그인) AuthenticationEntryPoint 부분에서 AuthenticationException 발생시키면서
 * 비로그인 상태에서 인증실패 시, AuthenticationEntryPoint 로 핸들링되어 이곳에서 처리
 */

@Component
public class JwtUnAuthorizedResponseAuthenticationEntryPoint implements AuthenticationEntryPoint, Serializable {

    private static final long serialVersionUID = -8970718410437077606L;

    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
        response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
                "You would need to provide the Jwt Token to Access This resource");
    }
}


