import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getPosts, addPost, deletePost } from '../actions/postsActions'
import { Container, Row, Col, Image, Form, Button, Table } from 'react-bootstrap'
import Swal from 'sweetalert2'
import styled from '@emotion/styled'

const Error = styled.p`
  border: 1px solid red;
  border-radius : 7%;
  padding: 0 1rem;
  background-color: #c17878;
  color: white;
  font-size: 1.5rem;
`

function Home() {
    const [ post, setPost ] = useState({ name: '', description : ''})
    const { name, description } = post
    const [ filter, setFilter ] = useState('')
    const { posts, error } = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const loadPosts = () => dispatch(getPosts())
    const handleFilter = e =>{
        setFilter(e.target.value)
    }
    const handleOnChange = e =>{
        setPost({
            ...post,
            [e.target.name] : e.target.value
        })
    }
    const addNewPost = e => {
        e.preventDefault()
        if(name.trim() === ''){
          document.getElementById("name").classList.add("error")
          if(description.trim() === ''){
            document.getElementById("description").classList.add("error")
          }
          return
        }
        dispatch(addPost(post)).then(() => {
          document.getElementById("name").classList.remove("error")
          document.getElementById("description").classList.remove("error")
          setPost({ name: '', description : ''})
        }) 
    }
    const removePost = id =>{
      Swal.fire({
        title: 'Estas seguro?',
        icon: 'error',
        showCancelButton: true,
        cancelButtonColor: '#38c1ca',
        confirmButtonColor: 'red',
        cancelButtonText: 'CANCELAR',
        confirmButtonText: 'BORRAR',
      }).then((result) => {
          if (result.isConfirmed) {
            dispatch(deletePost(id))
          }
      })
    }
    useEffect(()=>{
        loadPosts()
        // eslint-disable-next-line
    },[])
    return (
      <Container className='mt-5'>
        <Row className='mb-5 d-flex justify-content-center'>
          <Image src="https://www.tcit.cl/wp-content/uploads/2019/01/logo-tcit-color.png" rounded />
        </Row>
        { error ? 
          <Row className='d-flex justify-content-center'>
            <Error>{error.message}</Error>
          </Row> : null
        }
        <Form onSubmit={addNewPost}>
          <Row>
            <Col xl={5}>
              <Form.Control 
                type="text" 
                placeholder="Enter name"
                onChange={handleOnChange}
                name='name'
                value={name}
                id='name' />
            </Col>
            <Col xl={5}>
              <Form.Control 
                type="text" 
                placeholder="Enter description"
                onChange={handleOnChange}
                name='description'
                value={description}
                id='description' />
            </Col>
            <Col xl={2}>
              <Button type='submit' variant="primary" block>add</Button>
            </Col>
          </Row>
        </Form>
        <hr/>
        <Row className='mt-5`'>
          <Col xl={5}>
            <Form.Control type="text" placeholder="Find by name" onChange={handleFilter}/>
          </Col>
        </Row>
        <Table striped bordered hover className='mt-3'>
          <thead>
            <tr>
                <th>Name</th>
                <th>Description</th>
                <th>actions</th>
            </tr>
          </thead>
          <tbody>
            { 
                posts.map(post =>(
                    post.name.toLowerCase().includes(filter.toLowerCase()) 
                    ?
                        <tr key={post.id}>
                            <td>{post.name}</td>
                            <td>{post.description}</td>
                            <td>
                                <span className="material-icons trashCan" onClick={() => removePost(post.id)}>
                                    delete
                                </span>
                            </td>
                        </tr>
                    : null 
                ))
            }
          </tbody>
        </Table>
      </Container>
    );
}

export default Home;
