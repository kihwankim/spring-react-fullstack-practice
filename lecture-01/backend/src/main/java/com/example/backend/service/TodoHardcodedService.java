package com.example.backend.service;


import com.example.backend.domain.Todo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodedService {
    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "kkh", "learn to Dance", new Date(), false));
        todos.add(new Todo(++idCounter, "kkh", "learn about Microservice", new Date(), false));
        todos.add(new Todo(++idCounter, "kkh", "learn about Springboot", new Date(), false));
    }

    public List<Todo> findAll() {
        return TodoHardcodedService.todos;
    }
}
