import React from 'react';
import "antd/dist/antd.css";
import 'antd/dist/antd.min.css'

//Image upload modules
import { Upload, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';


class SitePagePictureUpload extends React.Component {


    render() {

        //Uploaded url
        function getBase64(file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        }


        class PicturesWall extends React.Component {
            state = {
                previewVisible: false,
                previewImage: '',
                previewTitle: '',
                fileList: [
                    // {
                    //     uid: '1',
                    //     name: 'image.png',
                    //     status: 'done',
                    //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                    // },
                    // {
                    //     uid: '2',
                    //     name: 'image.png',
                    //     status: 'done',
                    //     url: 'https://www.technologyhq.org/wp-content/uploads/2022/02/6-Ways-UXUI-Design-Impact-Digital-Marketing-Strategy.jpg',
                    // }
                ],
            };

            handleCancel = () => this.setState({ previewVisible: false });


            //Image Preview
            handlePreview = async file => {
                if (!file.url && !file.preview) {
                    file.preview = await getBase64(file.originFileObj);
                }

                this.setState({
                    previewImage: file.url || file.preview,
                    previewVisible: true,
                    previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
                });
            };

            handleChange = ({ fileList }) => this.setState({ fileList });

            render() {
                const { previewVisible, previewImage, fileList, previewTitle } = this.state;
                const uploadButton = (
                    <div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Add Picture</div>
                    </div>
                );
                return (
                    <>
                        <Upload
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={this.handlePreview}
                            onChange={this.handleChange}
                        >
                            {fileList.length >= 8 ? null : uploadButton}
                        </Upload>
                        <Modal
                            visible={previewVisible}
                            title={previewTitle}
                            footer={null}
                            onCancel={this.handleCancel}
                        >
                            <img alt="example" style={{ width: '100%' }} src={previewImage} />
                        </Modal>
                    </>
                );
            }
        }


        return (
            <div className="MainDiv">
                <div className="jumbotron text-center">
                    {/* <h3>Therichpost.com</h3> */}
                </div>

                <div className="container">

                    <PicturesWall />
                </div>
            </div>
        );
    }
}

export default SitePagePictureUpload;