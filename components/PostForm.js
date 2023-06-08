import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';

import {UPLOAD_IMAGES_REQUEST, REMOVE_LOADED_IMAGE, ADD_POST_REQUEST, addComment } from '../reducers/post';

//TODO: 이미지 업로드 과정 다시 공부 && useRef, useReducer, useCallback, useMemo 다시 공부...
const PostForm = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState('');
  const {imagePaths, addPostLoading, addPostDone } = useSelector((state) => state.post);

  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImages = useCallback((e)=>{
    console.log('images', e.target.files)
    const imageFormData = new FormData();
    [].forEach.call(e.target.files,(file)=>{
      imageFormData.append('image',file)
    })

    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    })

  },[])

  const onRemoveImage = useCallback((index)=>()=>{
    dispatch({
      type: REMOVE_LOADED_IMAGE,
      data: index,
    })
  },[])

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onSubmitForm = useCallback(() => {
    if(!text||!text.trim()){
      return alert('게시글을 작성하세요.')
    }

    const formData = new FormData()

    imagePaths.forEach((path)=>{
      formData.append('image',path)
    })
    
    formData.append('content',text) 

    dispatch({
      type: ADD_POST_REQUEST,
      data: formData,
    });
  }, [text, imagePaths]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmitForm}>
      <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText} />
      <div>
        <input type="file" multiple hidden ref={imageInput} onChange ={onChangeImages}/>
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addPostLoading}>올리기</Button>
      </div>
      <div>
        {imagePaths.map((image, i) => (
          <div key={image} style={{ display: 'inline-block' }}>
            <img src={`http://localhost:3065/${image}`} style={{ width: '200px' }} alt={image} />
            <div>
              <Button onClick={onRemoveImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </Form>
  );
};

export default PostForm;
