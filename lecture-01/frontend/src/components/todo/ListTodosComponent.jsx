import React, {Component} from 'react';

class ListTodosComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {
                    id: 1,
                    description: 'Learn React1',
                    done: false,
                    targetDate: new Date()
                }, {
                    id: 2,
                    description: 'Learn React2',
                    done: false,
                    targetDate: new Date()
                }, {
                    id: 3,
                    description: 'Learn React3',
                    done: false,
                    targetDate: new Date()
                }
            ]
        };
    }

    render() {
        return (
            <div>
                <h1>List Todos</h1>
                <div className="container">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>description</th>
                                <th>Is completed?</th>
                                <th>Target Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this
                                    .state
                                    .todos
                                    .map(
                                        todo => <tr key={todo.id}>
                                            <td>{todo.id}</td>
                                            <td>{todo.description}</td>
                                            <td>{
                                                    todo
                                                        .done
                                                        .toString()
                                                }</td>
                                            <td>
                                                {
                                                    todo
                                                        .targetDate
                                                        .toString()
                                                }
                                            </td>
                                        </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ListTodosComponent;