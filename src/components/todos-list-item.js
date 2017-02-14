import React from 'react';

export default class TodosListItem extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    renderTaskSection() {
        const {task, isCompleted} = this.props;

        const taskStyle = {
            textDecoration: isCompleted ? 'line-through' : 'initial',
        };

        if (this.state.isEditing) {
            return (
                <input type="text" style={taskStyle} className="form-control" defaultValue={task}
                       ref="editInput"/>
            );
        }

        return (
            <input type="text" style={taskStyle} className="form-control" defaultValue={task}
                   ref="editInput" onClick={this.props.toggleTask.bind(this, task)} disabled/>
        );
    }

    renderActionsSection() {
        if (this.state.isEditing) {
            return (
                <div className="input-group-btn">
                    <button className="btn btn-primary" onClick={this.onSaveClick.bind(this)}>Save</button>
                    <button className="btn btn-danger" onClick={this.onCancelClick.bind(this)}>Cancel</button>
                </div>
            );
        }

        return (
            <div className="input-group-btn">
                <button className="btn btn-success" onClick={this.onEditClick.bind(this)}>Edit</button>
                <button className="btn btn-danger" onClick={this.props.deleteTask.bind(this, this.props.task)}>Delete
                </button>
            </div>
        );
    }

    render() {
        return (
            <div className="input-group" style={{marginBottom: 15}}>
                {this.renderTaskSection()}
                {this.renderActionsSection()}
            </div>
        );
    }

    onEditClick() {
        this.setState({isEditing: true});
    }

    onCancelClick() {
        this.setState({isEditing: false});
    }

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({isEditing: false});
    }
}
